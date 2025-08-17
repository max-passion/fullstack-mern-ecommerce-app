import React from 'react';

const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
