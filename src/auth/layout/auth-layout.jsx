import { Grid, Typography } from "@mui/material";

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
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "medium" }}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid> 
  );
};
