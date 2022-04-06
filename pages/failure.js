import { Box } from "@mui/material";
import HomeLayout from "../layouts/homeLayout";
import bodyParser from "body-parser";
import { promisify } from "util";
import { useRouter } from "next/router";

const getBody = promisify(bodyParser.urlencoded());

const Failure = (props) => {
  const router = useRouter();
  if (props.data) {
    console.log(props.data);
  }

  return (
    <HomeLayout>
      <Box sx={{ p: 2 }}>
        <div>Transaction Failed</div>
      </Box>
    </HomeLayout>
  );
};

export async function getServerSideProps({ req, res }) {
  if (req.method === "POST") {
    await getBody(req, res);
  }

  return {
    props: {
      data: req?.body || "",
    }, // will be passed to the page component as props
  };
}

export default Failure;
