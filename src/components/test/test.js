import React, { useState, useContext } from 'react';

export default function TestPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="home">
      <div class="container">
        <p>hello</p>
      </div>
    </div>
  );
};