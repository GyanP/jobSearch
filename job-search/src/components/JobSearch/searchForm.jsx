import { Button, Card, CardBody, Form, FormGroup, Input } from 'reactstrap';
import moment from 'moment';

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
    <Card className='mb-1 border-0'>
      <CardBody>
        <Form onSubmit={onSubmit}>
          <div className='d-flex'>
            <FormGroup>
              <Input
                type='text'
                placeholder='Find your dream jobs now'
                name='title'
                value={title}
                onChange={onInputChange}
              />

              <Button color=' fa fa-search'></Button>
            </FormGroup>
          </div>
        </Form>

        <div className='d-flex flex-direction-column align-items-center flex-flow-wrap'>
          {isLoading ? (
            <h6>{loadingMessage}</h6>
          ) : jobResult && jobResult.length > 0 ? (
            jobResult.map((item, index) => {
              return (
                <div
                  className='job-card cursor-pointer'
                  key={index}
                  onClick={() => onView(index)}
                >
                  <div className='card-body'>
                    <h5 className='card-title'>{item.Title}</h5>
                    <h6 className='card-subtitle mb-2 text-muted'>
                      {item.Company}
                    </h6>
                    <p
                      className='card-text'
                      dangerouslySetInnerHTML={{
                        __html: item.Description.substr(0, 30),
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
          ) : (
            <h1>no</h1>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default SearchForm;
