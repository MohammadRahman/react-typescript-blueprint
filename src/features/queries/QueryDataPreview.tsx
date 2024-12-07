import Heading from "@components/heading/Heading";

type QueryDataPreviewProps = {
  data: any;
};
const QueryDataPreview = () => {
  return (
    <>
      <Heading as="h2">Show data preview</Heading>
      <p style={{ paddingTop: "1rem" }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus ad reiciendis
        voluptates? Facere quae dignissimos magni, at unde doloremque aliquam voluptatum eius in
        culpa laboriosam dolores incidunt aspernatur nostrum reiciendis! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Ex veniam atque architecto quis, molestias harum voluptate
        corporis quae dolores laudantium, exercitationem quidem necessitatibus vero excepturi
        aliquid repellendus, rerum recusandae vel!
      </p>
      <p style={{ paddingTop: "1rem" }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur debitis deserunt a
        perferendis nobis minus dolor, natus maiores neque, sequi, facere exercitationem? Quia eos
        suscipit mollitia quod sapiente rem eaque.
      </p>
      <p style={{ paddingTop: "1rem" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, beatae veritatis non
        harum delectus repellendus, aut nihil repellat repudiandae, consectetur et. Non omnis quidem
        delectus architecto, at ullam error eum? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Eos reiciendis iusto incidunt, praesentium, saepe blanditiis repudiandae amet tempora
        et necessitatibus nesciunt id quidem provident, ullam laboriosam facere cupiditate laborum
        odit.
      </p>
    </>
  );
};

export default QueryDataPreview;
