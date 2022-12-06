// pages/p/[id].tsx
import prisma from "../../lib/prisma";

// pages/p/[id].tsx
export const getServerSideProps = async ({}) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: post,
  };
};
