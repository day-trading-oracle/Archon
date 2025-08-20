import React, { useRef, useState, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useToast } from '../../contexts/ToastContext';
import { DeleteConfirmModal } from '../../pages/ProjectPage';
import { CheckSquare, Square, Trash2, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { Task } from './TaskTableView'; // Import Task interface
import { ItemTypes, getAssigneeIcon, getAssigneeGlow, getOrderColor, getOrderGlow } from '../../lib/task-utils';
import { DraggableTaskCard, DraggableTaskCardProps } from './DraggableTaskCard'; // Import the new component and its props

interface TaskBoardViewProps {
  tasks: Task[];
  onTaskView: (task: Task) => void;
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (task: Task) => void;
  onTaskMove: (taskId: string, newStatus: Task['status']) => void;
  onTaskReorder: (taskId: string, targetIndex: number, status: Task['status']) => void;
}

interface RowDropZoneProps {
  status: Task['status'];
  title: string;
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: Task['status']) => void;
  onTaskView: (task: Task) => void;
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (task: Task) => void;
  onTaskReorder: (taskId: string, targetIndex: number, status: Task['status']) => void;
  allTasks: Task[];
  hoveredTaskId: string | null;
  onTaskHover: (taskId: string | null) => void;
  selectedTasks: Set<string>;
  onTaskSelect: (taskId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const RowDropZone = ({
  status,
  title,
  tasks,
  onTaskMove,
  onTaskView,
  onTaskComplete,
  onTaskDelete,
  onTaskReorder,
  allTasks,
  hoveredTaskId,
  onTaskHover,
  selectedTasks,
  onTaskSelect,
  isCollapsed,
  onToggleCollapse
}: RowDropZoneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: { id: string; status: string }) => {
      if (item.status !== status) {
        // Moving to different status - use length of current row as new order
        onTaskMove(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  drop(ref);

  // Get row header color based on status
  const getRowColor = () => {
    switch (status) {
      case 'backlog':
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50';
      case 'in-progress':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30';
      case 'review':
        return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30';
      case 'complete':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
    }
  };

  // Get row border color based on status
  const getBorderColor = () => {
    switch (status) {
      case 'backlog':
        return 'border-gray-200 dark:border-gray-700';
      case 'in-progress':
        return 'border-blue-200 dark:border-blue-800';
      case 'review':
        return 'border-purple-200 dark:border-purple-800';
      case 'complete':
        return 'border-green-200 dark:border-green-800';
    }
  };

  // Just use the tasks as-is since they're already parent tasks only
  const organizedTasks = tasks;

  return (
    <div className={`border rounded-lg overflow-hidden ${getBorderColor()} ${isOver ? 'ring-2 ring-[#00ff00] ring-opacity-50' : ''}`}>
      {/* Row Header with Toggle */}
      <button
        onClick={onToggleCollapse}
        className={`w-full px-4 py-3 flex items-center justify-between ${getRowColor()} hover:opacity-80 transition-opacity`}
        aria-expanded={!isCollapsed}
        aria-controls={`row-content-${status}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
          <h3 className="font-mono text-sm font-medium">{title}</h3>
          <span className="text-xs opacity-70">({organizedTasks.length})</span>
        </div>
      </button>
      
      {/* Collapsible Content */}
      <div 
        ref={ref}
        id={`row-content-${status}`}
        className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${!isCollapsed ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          ${isOver ? 'bg-gray-100/50 dark:bg-gray-800/20' : 'bg-white/50 dark:bg-black/20'}
        `}
      >
        <div className="p-4 overflow-x-auto">
          <div className="flex gap-4 min-h-[200px]">
            {organizedTasks.map((task, index) => (
              <div key={task.id} className="flex-shrink-0 w-72">
                <DraggableTaskCard
                  task={task}
                  index={index}
                  onView={() => onTaskView(task)}
                  onComplete={() => onTaskComplete(task.id)}
                  onDelete={onTaskDelete}
                  onTaskReorder={onTaskReorder}
                  tasksInStatus={organizedTasks}
                  allTasks={allTasks}
                  hoveredTaskId={hoveredTaskId}
                  onTaskHover={onTaskHover}
                />
              </div>
            ))}
            {/* Empty state for collapsed rows */}
            {organizedTasks.length === 0 && (
              <div className="flex-shrink-0 w-80 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                Drop tasks here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TaskBoardView = ({
  tasks,
  onTaskView,
  onTaskComplete,
  onTaskDelete,
  onTaskMove,
  onTaskReorder
}: TaskBoardViewProps) => {
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  
  // Collapse state for each status row
  const [collapsedRows, setCollapsedRows] = useState<Set<Task['status']>>(new Set());

  // State for delete confirmation modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const { showToast } = useToast();

  // Multi-select handlers
  const toggleTaskSelection = useCallback((taskId: string) => {
    setSelectedTasks(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(taskId)) {
        newSelection.delete(taskId);
      } else {
        newSelection.add(taskId);
      }
      return newSelection;
    });
  }, []);

  const selectAllTasks = useCallback(() => {
    setSelectedTasks(new Set(tasks.map(task => task.id)));
  }, [tasks]);

  const clearSelection = useCallback(() => {
    setSelectedTasks(new Set());
  }, []);

  // Collapse/expand handlers
  const toggleRowCollapse = useCallback((status: Task['status']) => {
    setCollapsedRows(prev => {
      const newCollapsed = new Set(prev);
      if (newCollapsed.has(status)) {
        newCollapsed.delete(status);
      } else {
        newCollapsed.add(status);
      }
      return newCollapsed;
    });
  }, []);

  const isRowCollapsed = useCallback((status: Task['status']) => {
    return collapsedRows.has(status);
  }, [collapsedRows]);

  // Mass delete handler
  const handleMassDelete = useCallback(async () => {
    if (selectedTasks.size === 0) return;

    const tasksToDelete = tasks.filter(task => selectedTasks.has(task.id));
    
    try {
      // Delete all selected tasks
      await Promise.all(
        tasksToDelete.map(task => projectService.deleteTask(task.id))
      );
      
      // Clear selection
      clearSelection();
      
      showToast(`${tasksToDelete.length} tasks deleted successfully`, 'success');
    } catch (error) {
      console.error('Failed to delete tasks:', error);
      showToast('Failed to delete some tasks', 'error');
    }
  }, [selectedTasks, tasks, clearSelection, showToast]);

  // Mass status change handler
  const handleMassStatusChange = useCallback(async (newStatus: Task['status']) => {
    if (selectedTasks.size === 0) return;

    const tasksToUpdate = tasks.filter(task => selectedTasks.has(task.id));
    
    try {
      // Update all selected tasks
      await Promise.all(
        tasksToUpdate.map(task => 
          projectService.updateTask(task.id, { 
            status: mapUIStatusToDBStatus(newStatus) 
          })
        )
      );
      
      // Clear selection
      clearSelection();
      
      showToast(`${tasksToUpdate.length} tasks moved to ${newStatus}`, 'success');
    } catch (error) {
      console.error('Failed to update tasks:', error);
      showToast('Failed to update some tasks', 'error');
    }
  }, [selectedTasks, tasks, clearSelection, showToast]);

  // Helper function to map UI status to DB status (reuse from TasksTab)
  const mapUIStatusToDBStatus = (uiStatus: Task['status']) => {
    switch (uiStatus) {
      case 'backlog': return 'todo';
      case 'in-progress': return 'doing';
      case 'review': return 'review';
      case 'complete': return 'done';
      default: return 'todo';
    }
  };

  // Handle task deletion (opens confirmation modal)
  const handleDeleteTask = useCallback((task: Task) => {
    setTaskToDelete(task);
    setShowDeleteConfirm(true);
  }, [setTaskToDelete, setShowDeleteConfirm]);

  // Confirm deletion and execute
  const confirmDeleteTask = useCallback(async () => {
    if (!taskToDelete) return;

    try {
      await projectService.deleteTask(taskToDelete.id);
      // Notify parent to update tasks
      onTaskDelete(taskToDelete);
      showToast(`Task "${taskToDelete.title}" deleted successfully`, 'success');
    } catch (error) {
      console.error('Failed to delete task:', error);
      showToast(error instanceof Error ? error.message : 'Failed to delete task', 'error');
    } finally {
      setShowDeleteConfirm(false);
      setTaskToDelete(null);
    }
  }, [taskToDelete, onTaskDelete, showToast, setShowDeleteConfirm, setTaskToDelete, projectService]);

  // Cancel deletion
  const cancelDeleteTask = useCallback(() => {
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  }, [setShowDeleteConfirm, setTaskToDelete]);

  // Simple task filtering for board view
  const getTasksByStatus = (status: Task['status']) => {
    return tasks
      .filter(task => task.status === status)
      .sort((a, b) => a.task_order - b.task_order);
  };

  return (
    <div className="flex flex-col h-full min-h-[70vh]">
      {/* Multi-select toolbar */}
      {selectedTasks.size > 0 && (
        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {selectedTasks.size} task{selectedTasks.size !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Status change dropdown */}
            <select
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              onChange={(e) => {
                if (e.target.value) {
                  handleMassStatusChange(e.target.value as Task['status']);
                  e.target.value = ''; // Reset dropdown
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>Move to...</option>
              <option value="backlog">Backlog</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="complete">Complete</option>
            </select>
            
            {/* Mass delete button */}
            <button
              onClick={handleMassDelete}
              className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            
            {/* Clear selection */}
            <button
              onClick={clearSelection}
              className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Board Rows */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* Backlog Row */}
        <RowDropZone
          status="backlog"
          title="Backlog"
          tasks={getTasksByStatus('backlog')}
          onTaskMove={onTaskMove}
          onTaskView={onTaskView}
          onTaskComplete={onTaskComplete}
          onTaskDelete={onTaskDelete}
          onTaskReorder={onTaskReorder}
          allTasks={tasks}
          hoveredTaskId={hoveredTaskId}
          onTaskHover={setHoveredTaskId}
          selectedTasks={selectedTasks}
          onTaskSelect={toggleTaskSelection}
          isCollapsed={isRowCollapsed('backlog')}
          onToggleCollapse={() => toggleRowCollapse('backlog')}
        />
        
        {/* In Progress Row */}
        <RowDropZone
          status="in-progress"
          title="In Process"
          tasks={getTasksByStatus('in-progress')}
          onTaskMove={onTaskMove}
          onTaskView={onTaskView}
          onTaskComplete={onTaskComplete}
          onTaskDelete={onTaskDelete}
          onTaskReorder={onTaskReorder}
          allTasks={tasks}
          hoveredTaskId={hoveredTaskId}
          onTaskHover={setHoveredTaskId}
          selectedTasks={selectedTasks}
          onTaskSelect={toggleTaskSelection}
          isCollapsed={isRowCollapsed('in-progress')}
          onToggleCollapse={() => toggleRowCollapse('in-progress')}
        />
        
        {/* Review Row */}
        <RowDropZone
          status="review"
          title="Review"
          tasks={getTasksByStatus('review')}
          onTaskMove={onTaskMove}
          onTaskView={onTaskView}
          onTaskComplete={onTaskComplete}
          onTaskDelete={onTaskDelete}
          onTaskReorder={onTaskReorder}
          allTasks={tasks}
          hoveredTaskId={hoveredTaskId}
          onTaskHover={setHoveredTaskId}
          selectedTasks={selectedTasks}
          onTaskSelect={toggleTaskSelection}
          isCollapsed={isRowCollapsed('review')}
          onToggleCollapse={() => toggleRowCollapse('review')}
        />
        
        {/* Complete Row */}
        <RowDropZone
          status="complete"
          title="Complete"
          tasks={getTasksByStatus('complete')}
          onTaskMove={onTaskMove}
          onTaskView={onTaskView}
          onTaskComplete={onTaskComplete}
          onTaskDelete={onTaskDelete}
          onTaskReorder={onTaskReorder}
          allTasks={tasks}
          hoveredTaskId={hoveredTaskId}
          onTaskHover={setHoveredTaskId}
          selectedTasks={selectedTasks}
          onTaskSelect={toggleTaskSelection}
          isCollapsed={isRowCollapsed('complete')}
          onToggleCollapse={() => toggleRowCollapse('complete')}
        />
      </div>

      {/* Delete Confirmation Modal for Tasks */}
      {showDeleteConfirm && taskToDelete && (
        <DeleteConfirmModal
          itemName={taskToDelete.title}
          onConfirm={confirmDeleteTask}
          onCancel={cancelDeleteTask}
          type="task"
        />
      )}
    </div>
  );
};