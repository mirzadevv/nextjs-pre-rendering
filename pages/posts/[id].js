import styles from "../../styles/postItem.module.css";
export default function Post({ post }) {
  return (
    <>
      <div className={styles.postContainer}>
        <h2> POST ITEM (SSG) </h2>
        <p>
          <div className={styles.item}>
            <span className={styles.title}>title:</span>
            <span className={styles.value}> {post?.title}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>body:</span>
            <span className={styles.value}> {post?.body}</span>
          </div>
        </p>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const result = await response.json();

  const paths = result.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
    // false: This page is only created when we npm run build again, for example, if another post is added to the database and you did not run the build command, then you will encounter error 404, so in order not to encounter this error, fallback must be equals to true or "blocking"
    // true: The page is loaded immediately and sends a request to the client and then makes it static and will be statically loaded for other users as well.You have to show it loading until the data arrives
    // blocking: It is similar to the ServerSideRendering method only for the first person and will be for the rest of the users like StaticSideGeneration.
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const result = await response.json();
  return {
    props: {
      post: result,
    },
  };
}
