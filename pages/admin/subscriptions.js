import React, { useEffect, useState } from "react";
import HomeLayout from "../../layouts/homeLayout";
import Box from "@mui/material/Box";
import PlainLayout from "../../layouts/plainLayout";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import fb from "../../firebase/clientApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const db = getFirestore();

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "billingAddress.first_name", headerName: "Name", width: 200 },
  { field: "billingAddress.email", headerName: "Email", width: 300 },
  { field: "movieTitle", headerName: "Movie", width: 130 },
  {
    field: "subscriptionAmt",
    headerName: "subscriptionAmt",
    type: "number",
    width: 120,
  },
];

function flattenObject(ob, prefix = false, result = null) {
  result = result || {};

  // Preserve empty objects and arrays, they are lost otherwise
  if (
    prefix &&
    typeof ob === "object" &&
    ob !== null &&
    Object.keys(ob).length === 0
  ) {
    result[prefix] = Array.isArray(ob) ? [] : {};
    return result;
  }

  prefix = prefix ? prefix + "." : "";

  for (const i in ob) {
    if (Object.prototype.hasOwnProperty.call(ob, i)) {
      if (typeof ob[i] === "object" && ob[i] !== null) {
        // Recursion on deeper objects
        flattenObject(ob[i], prefix + i, result);
      } else {
        result[prefix + i] = ob[i];
      }
    }
  }
  return result;
}

export default function Subscriptions() {
  const [subs, setSubs] = useState([]);
  const auth = getAuth(fb);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const collectionRef = collection(db, "subscriptions");
    const q = query(
      collectionRef,
      where("paymentStatus", "==", "success"),
      orderBy("created", "desc"),
      limit(200)
    );
    const getSubs = onSnapshot(q, (QuerySnapshot) => {
      setSubs(
        QuerySnapshot.docs.map((doc) => ({
          ...flattenObject(doc.data()),
          id: doc.id,
        }))
      );
    });

    return getSubs;
  }, []);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <>
        {user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
          <HomeLayout>
            <Container sx={{ py: 5 }}>
              <Typography variant="h3" gutterBottom>
                Subscriptions
              </Typography>
              <Box
                sx={{
                  textAlign: "center",
                  justifyItems: "center",
                }}
              >
                {subs && (
                  <>
                    {console.log(subs)}
                    <div style={{ height: 800, width: "100%" }}>
                      <DataGrid
                        rows={subs}
                        columns={columns}
                        pageSize={50}
                        rowsPerPageOptions={[50]}
                        checkboxSelection
                      />
                    </div>
                  </>
                )}
              </Box>
            </Container>
          </HomeLayout>
        )}
        {user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
          <PlainLayout>
            <Container maxWidth="md" sx={{ py: 5 }}>
              <Typography align="center" variant="h3" gutterBottom>
                403
              </Typography>
              <Box
                sx={{
                  textAlign: "center",
                  justifyItems: "center",
                }}
              >
                Not authorized
              </Box>
            </Container>
          </PlainLayout>
        )}
      </>
    );
  }
  return <div>not auth</div>;
}
