import { getApplications } from '@/api/apiaplications';
import useFetch from '@/HOOKS/use-fetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import ApplicationCard from './application-card';

const CreatedApplications = () => {
  const { user } = useUser();

  const { fn: fnApplications, data: applications, loading: loadingApplications } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {loadingApplications ? (
        <p>Loading applications...</p>
      ) : (
        applications?.map(application => (
          <ApplicationCard application={application} key={application.id} isCandidate />
        ))
      )}
    </div>
  );
};

export default CreatedApplications;
