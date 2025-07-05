// // lib/redux/jobsSlice.ts
// import { fetchAllJobs, fetchMatchingJobTitles, fetchMatchingLocations } from '@/app/services/jobsApi';
// import { Job } from '@/app/types/job';
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// interface SearchQuery {
//   jobTitle: string;
//   location: string;
// }

// interface Filters {
//   jobType?: string[];
//   workMode?: string[];
//   function?: string[];
//   experienceLevel?: string[];
//   salaryMin?: number;
//   salaryMax?: number;
//   sortBy?: 'newest' | 'oldest'; // Added sortBy filter
// }

// interface JobsState {
//   allJobs: Job[];
//   filteredJobs: Job[];
//   isLoading: boolean;
//   error: string | null;
//   searchQuery: SearchQuery;
//   filters: Filters;
//   titleSuggestions: string[]; // New state to hold job title suggestions
//   locationSuggestions: string[]; // New state to hold location suggestions
// }

// const initialState: JobsState = {
//   allJobs: [],
//   filteredJobs: [],
//   isLoading: false,
//   error: null,
//   searchQuery: {
//     jobTitle: '',
//     location: '',
//   },
//   filters: {
//     jobType: [],
//     workMode: [],
//     function: [],
//     experienceLevel: [],
//     salaryMin: 0,
//     salaryMax: 200000,
//     sortBy: 'newest', // Default sortBy filter
//   },
//   titleSuggestions: [],
//   locationSuggestions: [],
// };

// // Fetch all jobs initially
// export const fetchInitialJobs = createAsyncThunk('jobs/fetchInitialJobs', async () => {
//   return await fetchAllJobs();
// });

// // Fetch filtered jobs based on search and filters
// export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, { getState }) => {
//   const { jobs } = getState() as { jobs: JobsState };
//   const allJobs = await fetchAllJobs(); // fetch all jobs or a subset

//   // Apply client-side filtering for partial match
//   const filteredJobs = allJobs.filter((job) => {
//     const matchesTitle =
//       !jobs.searchQuery.jobTitle ||
//       job.title.toLowerCase().includes(jobs.searchQuery.jobTitle.toLowerCase());
//     const matchesLocation =
//       !jobs.searchQuery.location ||
//       job.location.toLowerCase().includes(jobs.searchQuery.location.toLowerCase());
//     const matchesJobType = !jobs.filters.jobType?.length || jobs.filters.jobType.includes(job.jobType);
//     const matchesWorkMode = !jobs.filters.workMode?.length || jobs.filters.workMode.includes(job.workMode);
//     const matchesJobFunction = !jobs.filters.function?.length || jobs.filters.function.includes(job.function);
//     const matchesExperienceLevel =
//       !jobs.filters.experienceLevel?.length || jobs.filters.experienceLevel.includes(job.experienceLevel);
//     const matchesSalary =
//       (jobs.filters.salaryMin === undefined || job.salaryMin >= jobs.filters.salaryMin) &&
//       (jobs.filters.salaryMax === undefined || job.salaryMax <= jobs.filters.salaryMax);

//     return (
//       matchesTitle &&
//       matchesLocation &&
//       matchesJobType &&
//       matchesWorkMode &&
//       matchesJobFunction &&
//       matchesExperienceLevel &&
//       matchesSalary
//     );
//   });

//   return filteredJobs;
// });

// // Fetch matching job titles
// export const fetchJobTitleSuggestions = createAsyncThunk('jobs/fetchJobTitleSuggestions', async (title: string) => {
//   return await fetchMatchingJobTitles(title);
// });

// // Fetch matching locations
// export const fetchLocationSuggestions = createAsyncThunk('jobs/fetchLocationSuggestions', async (location: string) => {
//   return await fetchMatchingLocations(location);
// });

// const jobsSlice = createSlice({
//   name: 'jobs',
//   initialState,
//   reducers: {
//     setSearchQuery(state, action: PayloadAction<Partial<SearchQuery>>) {
//       state.searchQuery = { ...state.searchQuery, ...action.payload };
//     },
//     setFilters(state, action: PayloadAction<Partial<Filters>>) {
//       state.filters = { ...state.filters, ...action.payload };
//     },
//     resetFilters(state) {
//       state.filters = initialState.filters;
//       state.searchQuery = initialState.searchQuery;
//       state.filteredJobs = state.allJobs;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Initial fetch handlers
//       .addCase(fetchInitialJobs.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchInitialJobs.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.allJobs = action.payload;
//         state.filteredJobs = action.payload;
//       })
//       .addCase(fetchInitialJobs.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || 'Failed to fetch jobs';
//       })
//       // Filtered fetch handlers
//       .addCase(fetchJobs.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchJobs.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.filteredJobs = action.payload;
//       })
//       .addCase(fetchJobs.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || 'Failed to fetch jobs';
//       })
//       // Job title suggestions
//       .addCase(fetchJobTitleSuggestions.fulfilled, (state, action) => {
//         state.titleSuggestions = action.payload;
//       })
//       // Location suggestions
//       .addCase(fetchLocationSuggestions.fulfilled, (state, action) => {
//         state.locationSuggestions = action.payload;
//       });
//   },
// });

// export const { setSearchQuery, setFilters, resetFilters } = jobsSlice.actions;
// export default jobsSlice.reducer;


// lib/redux/jobsSlice.ts
import {
  fetchAllJobs,
  fetchMatchingJobTitles,
  fetchMatchingLocations,
} from '@/app/services/jobsApi';
import { Job } from '@/app/types/job';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

interface SearchQuery {
  jobTitle: string;
  location: string;
}

interface Filters {
  jobType?: string[];
  workMode?: string[];
  function?: string[];
  experienceLevel?: string[];
  salaryMin?: number;
  salaryMax?: number;
  sortBy?: 'newest' | 'oldest'; // Added sortBy filter
}

interface JobsState {
  allJobs: Job[];
  filteredJobs: Job[];
  isLoading: boolean;
  error: string | null;
  searchQuery: SearchQuery;
  filters: Filters;
  titleSuggestions: string[];
  locationSuggestions: string[];
}

const initialState: JobsState = {
  allJobs: [],
  filteredJobs: [],
  isLoading: false,
  error: null,
  searchQuery: {
    jobTitle: '',
    location: '',
  },
  filters: {
    jobType: [],
    workMode: [],
    function: [],
    experienceLevel: [],
    salaryMin: 0,
    salaryMax: 200000,
    sortBy: 'newest',
  },
  titleSuggestions: [],
  locationSuggestions: [],
};

// Fetch all jobs initially
export const fetchInitialJobs = createAsyncThunk(
  'jobs/fetchInitialJobs',
  async () => {
    return await fetchAllJobs();
  }
);

// Fetch filtered and sorted jobs
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (_, { getState }) => {
    const { jobs } = getState() as { jobs: JobsState };
    const allJobs = await fetchAllJobs();

    const filteredJobs = allJobs.filter((job) => {
      const matchesTitle =
        !jobs.searchQuery.jobTitle ||
        job.title
          .toLowerCase()
          .includes(jobs.searchQuery.jobTitle.toLowerCase());

      const matchesLocation =
        !jobs.searchQuery.location ||
        job.location
          .toLowerCase()
          .includes(jobs.searchQuery.location.toLowerCase());

      const matchesJobType =
        !jobs.filters.jobType?.length ||
        jobs.filters.jobType.includes(job.jobType);

      const matchesWorkMode =
        !jobs.filters.workMode?.length ||
        jobs.filters.workMode.includes(job.workMode);

      const matchesJobFunction =
        !jobs.filters.function?.length ||
        jobs.filters.function.includes(job.function);

      const matchesExperienceLevel =
        !jobs.filters.experienceLevel?.length ||
        jobs.filters.experienceLevel.includes(job.experienceLevel);

      const matchesSalary =
        (jobs.filters.salaryMin === undefined ||
          job.salaryMin >= jobs.filters.salaryMin) &&
        (jobs.filters.salaryMax === undefined ||
          job.salaryMax <= jobs.filters.salaryMax);

      return (
        matchesTitle &&
        matchesLocation &&
        matchesJobType &&
        matchesWorkMode &&
        matchesJobFunction &&
        matchesExperienceLevel &&
        matchesSalary
      );
    });

    // ✅ Apply client-side sorting
    const sortedJobs = filteredJobs.sort((a, b) => {
      if (jobs.filters.sortBy === 'oldest') {
        return (
          new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
        );
      }
      // Default to 'newest'
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });

    return sortedJobs;
  }
);

// Fetch job title suggestions
export const fetchJobTitleSuggestions = createAsyncThunk(
  'jobs/fetchJobTitleSuggestions',
  async (title: string) => {
    return await fetchMatchingJobTitles(title);
  }
);

// Fetch location suggestions
export const fetchLocationSuggestions = createAsyncThunk(
  'jobs/fetchLocationSuggestions',
  async (location: string) => {
    return await fetchMatchingLocations(location);
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
      state.searchQuery = initialState.searchQuery;
      state.filteredJobs = state.allJobs;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInitialJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allJobs = action.payload;
        state.filteredJobs = action.payload;
      })
      .addCase(fetchInitialJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch jobs';
      })

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
      })

      .addCase(fetchJobTitleSuggestions.fulfilled, (state, action) => {
        state.titleSuggestions = action.payload;
      })

      .addCase(fetchLocationSuggestions.fulfilled, (state, action) => {
        state.locationSuggestions = action.payload;
      });
  },
});

export const { setSearchQuery, setFilters, resetFilters } = jobsSlice.actions;
export default jobsSlice.reducer;
