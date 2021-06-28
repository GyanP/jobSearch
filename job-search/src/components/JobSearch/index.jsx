import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import SearchForm from './searchForm';
import axios from 'axios';
const queryString = require('query-string');

const initialStates = {
  title: '',
};
const JobSearch = (props) => {
  const [searchInputs, setSearchInputs] = useState(initialStates);
  const [jobResult, setJobResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('');
  const {
    location: { search },
  } = props;

  const parsed = queryString.parse(search);

  useEffect(() => {
    const { title = '' } = parsed;
    if (parsed && title != '') {
      setIsLoading(true);
      setLoadingMessage(
        'Request is being processed and results will be available shortly.'
      );
      getData(title);
    }
  }, [search]);

  const getData = async (title) => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}search?query=${title}`)
      .then(async (result) => {
        const { status, data } = result;

        if (status === 201) {
          setLoadingMessage('Loading... Your results will appear here');
          await axios
            .get(`${process.env.REACT_APP_SERVER_URL}status/${data}`)
            .then(async (resultant) => {
              if (resultant.status === 202) {
                await getData(title);
              } else if (resultant.status === 200) {
                await axios
                  .get(`${process.env.REACT_APP_SERVER_URL}result/${data}`)
                  .then(async (resultantResult) => {
                    setJobResult(resultantResult.data.slice(0, 10));
                    localStorage.setItem(
                      'jobData',
                      JSON.stringify(resultantResult.data.slice(0, 10))
                    );
                    setIsLoading(false);
                    setLoadingMessage('');
                  });
              }
            })
            .catch((errors) => {});
        } else if (status === 200) {
          setJobResult(data.slice(0, 10));
          localStorage.setItem('jobData', JSON.stringify(data.slice(0, 10)));
          setIsLoading(false);
          setLoadingMessage('');
        }
      })
      .catch((error) => {});
  };
  /*
--------------------------------------
	Function to set the search input
--------------------------------------
		*/
  const onInputChange = (e) => {
    const {
      target: { value, name },
    } = e;
    setSearchInputs({
      ...searchInputs,
      [name]: value,
    });
  };

  /*
--------------------------
	For Searching
---------------------------
	 */
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title } = searchInputs;
      props.history.push(`/?title=${title}`);
    } catch (error) {}
  };

  const onView = (index) => {
    props.history.push('/view/:id'.replace(':id', index));
  };

  return (
    <Container className='mt-2'>
      <SearchForm
        isLoading={isLoading}
        onView={onView}
        onSubmit={onSubmit}
        loadingMessage={loadingMessage}
        onInputChange={onInputChange}
        searchInputs={searchInputs}
        jobResult={jobResult}
      />
    </Container>
  );
};

export default JobSearch;
