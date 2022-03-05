import React, { useEffect } from "react";
import { useParams } from "react-router";

let rows = [
  {
    "id": "001",
    "customer": "Steve"
  },
  {
    "id": "017",
    "customer": "Steve"
  },
  {
    "id": "021",
    "customer": "Steve"
  },
  {
    "id": "101",
    "customer": "Steve"
  }
];

function Post() {
  let { postSlug } = useParams();

  useEffect(() => {
    // Fetch post using the postSlug
  }, [postSlug]);

  return (
    <div className="home">
      <div class="container">
        <h2 className="mt-10">{postSlug}</h2>
        <h6 className="mb-10">{rows.id} {postSlug}</h6>
        <p>
          {rows.customer}
        </p>
      </div>
    </div>
  );
}

export default Post;