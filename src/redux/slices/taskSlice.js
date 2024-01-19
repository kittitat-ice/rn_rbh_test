import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {GET_tasks} from '../../services/taskAPI';

const initialState = {
  todoList: [],
  doingList: [],
  doneList: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      return {...state, todoList: action.payload};
    },
    clearTodoList: state => {
      return {...state, todoList: initialState.todoList};
    },
    setDoingList: (state, action) => {
      return {...state, doingList: action.payload};
    },
    clearDoingList: state => {
      return {...state, doingList: initialState.doingList};
    },
    setDoneList: (state, action) => {
      return {...state, doneList: action.payload};
    },
    clearDoneList: state => {
      return {...state, doneList: initialState.doneList};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTodos.pending, state => {
        console.log('getTodos pending');
      })
      .addCase(getTodos.rejected, (state, action) => {
        console.log('getTodos rejected');
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        console.log('getTodos fulfilled');
        const {data, extra} = action.payload;
        const newTasks = data.tasks;

        if (extra.replaceState === true) {
          return {...state, todoList: newTasks}
        }

        const prevTasks = state.todoList;
        const newTodoList = [].concat(prevTasks).concat(newTasks);
        return {...state, todoList: newTodoList};
      })
      .addCase(getDoings.pending, state => {
        console.log('getDoings pending');
      })
      .addCase(getDoings.rejected, (state, action) => {
        console.log('getDoings rejected');
      })
      .addCase(getDoings.fulfilled, (state, action) => {
        console.log('getDoings fulfilled');
        const {data, extra} = action.payload;
        const newTasks = data.tasks;

        if (extra.replaceState === true) {
          return {...state, doingList: newTasks}
        }

        const prevTasks = state.doingList;
        const newDoingList = [].concat(prevTasks).concat(newTasks);
        return {...state, doingList: newDoingList};
      })
      .addCase(getDones.pending, state => {
        console.log('getDones pending');
      })
      .addCase(getDones.rejected, (state, action) => {
        console.log('getDones rejected');
      })
      .addCase(getDones.fulfilled, (state, action) => {
        console.log('getDones fulfilled');
        const {data, extra} = action.payload;
        const newTasks = data.tasks;

        if (extra.replaceState === true) {
          return {...state, doneList: newTasks}
        }

        const prevTasks = state.doneList;
        const newDoneList = [].concat(prevTasks).concat(newTasks);
        return {...state, doneList: newDoneList};
      });
  },
});

export const getTodos = createAsyncThunk(
  'task/getTodos',
  async (
    {offset, limit, sortBy, isAsc, replaceState},
    {dispatch, getState, rejectWithValue, fulfillWithValue},
  ) => {
    const status = 'TODO';
    let response = await GET_tasks(status, offset, limit, sortBy, isAsc);

    if (response.status === 401) {
      // handle refresh new token
      // const refresh = await dispatch(refreshNewToken());
      // if (refresh.payload.status === 200) {
      //   response = await GET_tasks(status, offset, limit, isAsc);
      // }
    }

    const resWithExtra = {...response, extra: {replaceState: replaceState}};

    if (!response.status || response.status !== 200) {
      if (response.status === 401) {
        // handle 401 error
        // dispatch(showLogoutAlert());
      }
      return rejectWithValue(resWithExtra);
    }
    return resWithExtra;
  },
);

export const getDoings = createAsyncThunk(
  'task/getDoings',
  async (
    {offset, limit, sortBy, isAsc, replaceState},
    {dispatch, getState, rejectWithValue, fulfillWithValue},
  ) => {
    const status = 'DOING';
    let response = await GET_tasks(status, offset, limit, sortBy, isAsc);

    if (response.status === 401) {
      // handle refresh new token
      // const refresh = await dispatch(refreshNewToken());
      // if (refresh.payload.status === 200) {
      //   response = await GET_tasks(status, offset, limit, isAsc);
      // }
    }

    const resWithExtra = {...response, extra: {replaceState: replaceState}};

    if (!response.status || response.status !== 200) {
      if (response.status === 401) {
        // handle 401 error
        // dispatch(showLogoutAlert());
      }
      return rejectWithValue(resWithExtra);
    }
    return resWithExtra;
  },
);

export const getDones = createAsyncThunk(
  'task/getDones',
  async (
    {offset, limit, sortBy, isAsc, replaceState},
    {dispatch, getState, rejectWithValue, fulfillWithValue},
  ) => {
    const status = 'DONE';
    let response = await GET_tasks(status, offset, limit, sortBy, isAsc);

    if (response.status === 401) {
      // handle refresh new token
      // const refresh = await dispatch(refreshNewToken());
      // if (refresh.payload.status === 200) {
      //   response = await GET_tasks(status, offset, limit, isAsc);
      // }
    }

    const resWithExtra = {...response, extra: {replaceState: replaceState}};

    if (!response.status || response.status !== 200) {
      if (response.status === 401) {
        // handle 401 error
        // dispatch(showLogoutAlert());
      }
      return rejectWithValue(resWithExtra);
    }
    return resWithExtra;
  },
);

export const {
  setTodoList,
  clearTodoList,
  setDoingList,
  clearDoingList,
  setDoneList,
  clearDoneList,
} = taskSlice.actions;
export const selectTaskReducer = state => state.task;

export default taskSlice.reducer;
