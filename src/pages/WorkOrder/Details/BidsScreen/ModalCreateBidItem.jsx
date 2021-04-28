import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

import { create as createBid } from '@redux/workOrderBids/actions';
import { ContentLoader, FormControlFormik } from 'component';

import { getWonID } from './../helper';
import { withRouter } from 'react-router';

/**
 * TODO: Add Validation Schema
 */
const validationSchema = Yup.object().shape({}, []);

const ModalCreateBitItem = props => {
  const { isOpen, handleClose } = props;
  const wonId = getWonID(props);
  const d = useDispatch();

  const initialValues = {
    bid_item_number: 'new',
    item_description: '',
    usd_unit_price: 0,
    number_of_units: 0,
    unit_of_measure: 'EA',
    status: ''
  };

  const handleSubmit = async (data, formik) => {
    await d(
      createBid(wonId, {
        ...data
      })
    );
  };

  const renderForm = formikProps => {
    if (formikProps.isSubmitting) {
      return <ContentLoader>Creating...</ContentLoader>;
    }

    return (
      <FormikForm>
        <Modal.Header closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControlFormik name="item_description" label="Item Description" />
          <FormControlFormik label="Quantity" type="number" name="number_of_units" />
          <FormControlFormik label="Unit of Measure" as="select" name="unit_of_measure">
            <option>EA</option>
            <option>CY</option>
            <option>SQFT</option>
            <option>SY</option>
            <option>LF</option>
            <option>CF</option>
            <option>SQ</option>
            <option>GAL</option>
          </FormControlFormik>
          <FormControlFormik label="Price Per Unit" type="number" name="usd_unit_price" />
          <Button variant="primary" type="submit" onClick={formikProps.handleSubmit}>
            Submit
          </Button>
        </Modal.Body>
      </FormikForm>
    );
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Formik validationSchema={validationSchema} onSubmit={handleSubmit} initialValues={initialValues}>
        {renderForm}
      </Formik>
    </Modal>
  );
};

export default withRouter(ModalCreateBitItem);
