import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import moment from 'moment';

const ViewForm = ({ jobResult, onApply, appliedStatus, onBack }) => {
  const { Title, Company, Description, Location, Published } = jobResult || {};
  return (
    <Card className='mb-1 border-0'>
      <CardBody>
        <div className=''>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <div
                className='fa fa-angle-left cursor-pointer'
                onClick={() => onBack()}
              />
            </Col>
            <Col xs={12} md={8} lg={8}>
              <h5 className='card-title'>{Title}</h5>
              <h6 className='card-subtitle mb-2 text-muted'>{Company}</h6>
              <p>
                <span className='fa fa-map-marker mr-2' />
                <span>{Location}</span>
              </p>
              <p>{moment(Published).format('DD MMMM YYYY')}</p>
            </Col>
            <Col xs={12} md={4} lg={4}>
              <Button
                color={`${
                  appliedStatus === 'Applied' ? 'secondary' : 'success'
                }`}
                onClick={() => onApply()}
                disabled={appliedStatus === 'Applied' ? true : false}
              >
                {appliedStatus}
              </Button>
            </Col>
            <Col xs={12} md={12} lg={12}>
              <p
                className='card-text'
                dangerouslySetInnerHTML={{
                  __html: Description,
                }}
              />
            </Col>
            {appliedStatus !== 'Applied' ? (
              <Col xs={12} md={12} lg={12}>
                <Button
                  color='success'
                  onClick={() => onApply()}
                  className='d-flex m-0-auto'
                >
                  Apply
                </Button>
              </Col>
            ) : null}
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default ViewForm;
