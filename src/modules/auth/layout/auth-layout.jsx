import { Grid, Typography, Box } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "calc(100vh - 64px)",
        backgroundColor: 'background.default',
        padding: 2
      }}
    >
      <Grid
        item
        xs={12} sm={8} md={6} lg={5}
        sx={{
          p: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 2
          }}
        >
          <AccountCircle sx={{ fontSize: 35 }} />
          <Typography variant="h4" sx={{ fontWeight: "medium" }}>
            {title}
          </Typography>
        </Box>


        {children}
      </Grid>
    </Grid> 
  );
};
