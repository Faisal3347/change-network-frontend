import React, { useState, useEffect } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography, Grid, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import CommonTable from '../components/CommonTable';
import ProgressSummary from '../components/ProgressSummary';
import {
  fetchTasksAPI,
  addTaskAPI,
  deleteTaskAPI,
  updateStatusAPI,
} from '../api';

const headers = ['Title', 'From Time', 'To Time', 'Status', 'Actions'];

const Home = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskCounts, setTaskCounts] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    fromTime: '',
    toTime: ''
  });
  const [statusDialog, setStatusDialog] = useState({ open: false, task: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, task: null });
  const [status, setStatus] = useState('To Do');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchTasks = async () => {
    try {
      const data = await fetchTasksAPI();
      setTasks(data.tasks);
      setTaskCounts(data.counts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setError('');
    setSuccess('');
  };

  const handleClose = () => {
    setOpen(false);
    setTaskData({ title: '', description: '', fromTime: '', toTime: '' });
  };

  const handleChange = (e) => {
    setTaskData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await addTaskAPI(taskData);
      setSuccess('Task added');
      handleClose();
      fetchTasks();
    } catch (err) {
      setError(err.message || 'Failed');
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.task) return;
    try {
      await deleteTaskAPI(deleteDialog.task._id);
      setDeleteDialog({ open: false, task: null });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async () => {
    if (!statusDialog.task) return;
    try {
      await updateStatusAPI(statusDialog.task._id, status);
      setStatusDialog({ open: false, task: null });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f9faff', minHeight: '100vh' }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight="bold">Task</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>Add Task</Button>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <ProgressSummary
          pending={taskCounts.pending}
          inProgress={taskCounts.inProgress}
          completed={taskCounts.completed}
          total={taskCounts.total}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <CommonTable
          headers={headers}
          data={tasks}
          onUpdate={(task) => setStatusDialog({ open: true, task })}
          onDelete={(task) => setDeleteDialog({ open: true, task })}
        />
      </Box>

      {/* Add Task Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Task Title" name="title" fullWidth value={taskData.title} onChange={handleChange} />
          <TextField margin="dense" label="Description" name="description" fullWidth multiline rows={2} value={taskData.description} onChange={handleChange} />
          <TextField margin="dense" label="From Time" name="fromTime" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} value={taskData.fromTime} onChange={handleChange} />
          <TextField margin="dense" label="To Time" name="toTime" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} value={taskData.toTime} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={statusDialog.open} onClose={() => setStatusDialog({ open: false, task: null })}>
        <DialogTitle>Update Task Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialog({ open: false, task: null })}>Cancel</Button>
          <Button onClick={handleStatusUpdate}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, task: null })}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, task: null })}>No</Button>
          <Button color="error" onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
