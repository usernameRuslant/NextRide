import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import css from './BookingForm.module.css';
import Loader from '../Loader/Loader';

interface BookingFormProps {
  carId: string;
}

interface FormValues {
  name: string;
  email: string;
  date: Date | null;
  comment: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  date: null,
  comment: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .matches(
      /^[A-Za-zА-Яа-яЇїІіЄєҐґ]+(?:\s[A-Za-zА-Яа-яЇїІіЄєҐґ]+)*$/,
      'Only letters and single spaces allowed'
    )
    .min(2, 'Name must be at least 2 characters')
    .max(40, 'Name must be at most 50 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .max(40, 'Email is too long')
    .required('Email is required'),
  date: Yup.date()
    .nullable()
    .required('Booking date is required')
    .min(new Date(), 'Booking date cannot be in the past')
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'Booking date cannot be more than 1 year ahead'
    ),
  comment: Yup.string()
    .max(300, 'Comment cannot exceed 300 characters')
    .trim('Comment cannot be empty spaces'),
});

function BookingForm({ carId }: BookingFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    setLoading(true);

    const payload = { ...values, carId };
    console.log('Booking request:', payload);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const success = Math.random() > 0.2;
      if (success) {
        iziToast.success({
          title: 'Success',
          message: `Car booked for ${values.date?.toLocaleDateString()} by ${
            values.name
          }`,
          position: 'topRight',
        });
        resetForm();
      } else {
        throw new Error('Fake server error');
      }
    } catch (error) {
      console.error('Booking error:', error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Try again later.',
        position: 'topRight',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.bookingContainer}>
      <h3>Book your car now</h3>
      <p>Stay connected! We are always ready to help you.</p>
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.bookingForm}>
            <ul className={css.formGroupList}>
              <li className={css.formGroup}>
                <Field type="text" name="name" placeholder="Name*" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
              </li>
              <li className={css.formGroup}>
                <Field type="email" name="email" placeholder="Email*" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </li>
              <li className={css.formGroup}>
                <DatePicker
                  selected={values.date}
                  onChange={(date) => setFieldValue('date', date)}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Booking date"
                  className={css.datepicker}
                  popperPlacement="top-start"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className={css.error}
                />
              </li>
              <li className={css.formGroup}>
                <Field
                  as="textarea"
                  name="comment"
                  placeholder="Comment"
                  rows={3}
                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className={css.error}
                />
              </li>
            </ul>

            {loading ? (
              <Loader />
            ) : (
              <button type="submit" className={css.btnSend}>
                Send
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BookingForm;
