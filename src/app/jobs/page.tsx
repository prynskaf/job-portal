'use client';

import React, { Suspense } from 'react';
import JobSearch from '../Components/Job/JobSearch/JobSearch';

export default function Jobs() {
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <JobSearch />
    </Suspense>
  );
}




