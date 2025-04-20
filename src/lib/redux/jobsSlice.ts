// lib/redux/jobsSlice.ts
import { fetchAllJobs, fetchFilteredJobs } from '@/app/services/jobsApi';
import { Job } from '@/app/types/job';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface SearchQuery {
  jobTitle: string;
  country: string;
}

interface Filters {
  jobType?: string[];
  workMode?: string[];
  jobFunction?: string[];
  experienceLevel?: string[];
  salaryMin?: number;
  salaryMax?: number;
}

interface JobsState {
  allJobs: Job[]; // Store all jobs here
  filteredJobs: Job[]; // Store filtered results here
  isLoading: boolean;
  error: string | null;
  searchQuery: SearchQuery;
  filters: Filters;
}

const initialState: JobsState = {
  allJobs: [],
  filteredJobs: [],
  isLoading: false,
  error: null,
  searchQuery: {
    jobTitle: '',
    country: '',
  },
  filters: {
    jobType: [],
    workMode: [],
    jobFunction: [],
    experienceLevel: [],
    salaryMin: 0,
    salaryMax: 200000,
  },
};

// Fetch all jobs initially
export const fetchInitialJobs = createAsyncThunk(
  'jobs/fetchInitialJobs',
  async () => {
    return await fetchAllJobs();
  }
);

// Fetch filtered jobs based on search and filters
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (_, { getState }) => {
    const { jobs } = getState() as { jobs: JobsState };
    return await fetchFilteredJobs(jobs.searchQuery, jobs.filters);
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<Partial<SearchQuery>>) {
      state.searchQuery = { ...state.searchQuery, ...action.payload };
    },
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
      state.filteredJobs = state.allJobs; // Show all jobs when resetting
    },
  },
  extraReducers: (builder) => {
    builder
      // Initial fetch handlers
      .addCase(fetchInitialJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInitialJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allJobs = action.payload;
        state.filteredJobs = action.payload; // Initially show all jobs
      })
      .addCase(fetchInitialJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch jobs';
      })
      // Filtered fetch handlers
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredJobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch jobs';
      });
  },
});

export const { setSearchQuery, setFilters, resetFilters } = jobsSlice.actions;
export default jobsSlice.reducer;