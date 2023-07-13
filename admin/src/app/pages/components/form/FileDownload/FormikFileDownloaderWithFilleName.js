import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { saveAs } from 'file-saver';
import { Button } from 'reactstrap';
import FormRow from '../FormRow';

export default function FormikFileDownloaderWithFileName({
  label,
  name,
  disabled,
}) {
  const [data] = useField(name);
  const download = useCallback((url) => {
    saveAs(url);
  }, []);
  return (
    <FormRow label={label}>
      {!disabled &&
      data?.value &&
      Array.isArray(data.value) &&
      data.value.length > 0 ? (
        data.value.map((el, index) => {
          console.log(el.originalName);
          if (el !== null) {
            return (
              <div key={index} style={{ marginBottom: '1em' }}>
                <div className="form-control" disabled={disabled}>
                  {el?.originalName || el?.name}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1em',
                      right: '1.2em',
                      marginTop: '1em',
                    }}
                  >
                    <Button
                      className="ml-auto"
                      type="button"
                      color="success"
                      onClick={() =>
                        download(el?.origin?.url || el?.url || el?.path)
                      }
                    >
                      다운로드
                    </Button>
                  </div>
                </div>
              </div>
            );
          } else {
            return;
          }
        })
      ) : (
        <div>없음</div>
      )}
    </FormRow>
  );
}
FormikFileDownloaderWithFileName.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.boolean,
};
FormikFileDownloaderWithFileName.defaultProps = {};
