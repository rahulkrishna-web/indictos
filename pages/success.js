import { Box, Paper, Typography } from "@mui/material";
import HomeLayout from "../layouts/homeLayout";
import bodyParser from "body-parser";
import { promisify } from "util";
import { useRouter } from "next/router";

const getBody = promisify(bodyParser.urlencoded());

const Success = (props) => {
  const router = useRouter();
  if (props.data) {
    console.log(props.data);
  }

  return (
    <HomeLayout>
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h3" component="div">
            Success
          </Typography>
          {props.data && (
            <>
              <Typography variant="subtitle1" component="div">
                Txn Id : {props.data.txnid}
              </Typography>
              <Typography variant="subtitle1" component="div">
                Status : {props.data.status}
              </Typography>
              <Typography variant="subtitle1" component="div">
                Method : {props.data.bankcode}
              </Typography>
            </>
          )}
        </Paper>
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

export default Success;
