import { Button, Card, CardBody, Form, FormGroup, Input } from 'reactstrap';
import moment from 'moment';
import ImgLoader from '../../assets/loading.gif';
const SearchForm = ({
  onSubmit,
  onInputChange,
  searchInputs,
  jobResult,
  onView,
  isLoading,
  loadingMessage,
}) => {
  const { title } = searchInputs;
  return (
    <Card className='mb-1 border-0 bg-none'>
      <CardBody>
        <h1 className='text-center text-white head'>Welcome to DevJobs</h1>
        <Form onSubmit={onSubmit}>
          <div className='d-flex justify-content-center mb-5'>
            <FormGroup className='d-flex'>
              <Input
                type='text'
                placeholder='Find your dream jobs now'
                name='title'
                value={title}
                onChange={onInputChange}
              />

              <Button className='btn btn-success search-btn'>Search</Button>
            </FormGroup>
          </div>
        </Form>

        <div className=''>
          {isLoading ? (
            <>
              <h3 className='text-center text-white'>{loadingMessage}</h3>
              <img
                width='350'
                src={ImgLoader}
                className='mx-auto d-block'
                alt=''
              />
            </>
          ) : jobResult && jobResult.length > 0 ? (
            jobResult.map((item, index) => {
              return (
                <div
                  className='job-card cursor-pointer'
                  key={index}
                  onClick={() => onView(index)}
                >
                  <div className='card-body'>
                    <h5 className='card-title'>
                      {item.Title}
                      {localStorage.getItem(`jobApplied-${index}`) ? (
                        <Button color='secondary' disabled={true}>
                          {'Applied'}
                        </Button>
                      ) : null}
                    </h5>
                    <h6 className='card-subtitle mb-2 text-muted'>
                      {item.Company}
                    </h6>
                    <p
                      className='card-text text-muted'
                      dangerouslySetInnerHTML={{
                        __html: item.Description.substr(0, 100),
                      }}
                    />
                    <p>
                      <span className='fa fa-map-marker mr-2' />
                      <span>{item.Location}</span>
                    </p>{' '}
                    <p>{moment(item.Published).format('DD MMMM YYYY')}</p>
                  </div>
                </div>
              );
            })
          ) : null}
        </div>
      </CardBody>
    </Card>
  );
};

export default SearchForm;
