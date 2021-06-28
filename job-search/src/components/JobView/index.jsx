import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
const ViewForm = React.lazy(() => import('./viewForm'));

const JobView = (props) => {
  const [appliedStatus, setAppliedStatus] = useState('Apply');
  const [jobResult, setJobResult] = useState([]);
  const {
    match: { params },
  } = props;

  useEffect(() => {
    const stringifyData = localStorage.getItem('jobData');
    if (stringifyData && JSON.parse(stringifyData).length > 0 && params.id) {
      const data = JSON.parse(stringifyData);
      setJobResult(data[params.id]);
      const status = localStorage.getItem(`jobApplied-${params.id}`);
      if (status === 'Applied') setAppliedStatus('Applied');
    } else {
      props.history.push('/');
    }
  }, []);

  /*
--------------------------
	For Job Apply
---------------------------
	 */
  const onApply = () => {
    if (appliedStatus === 'Applied') return;
    else {
      localStorage.setItem(`jobApplied-${params.id}`, 'Applied');
      setAppliedStatus('Applied');
    }
  };

  const onBack = () => {
    props.history.goBack();
  };

  return (
    <Container className='mt-2'>
      <ViewForm
        jobResult={jobResult}
        onApply={onApply}
        onBack={onBack}
        appliedStatus={appliedStatus}
      />
    </Container>
  );
};

export default JobView;
