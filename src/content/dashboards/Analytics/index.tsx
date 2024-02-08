import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';


import SongAnalytics from './SongAnalytics';
import PopularArtists from './PopularArtists';

function Dashboard() {
  return (
    <>
      <Helmet>
        <title> Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <SongAnalytics />
          </Grid>
          <Grid item lg={10} xs={12}>
            <PopularArtists />
          </Grid>
          <Grid item lg={10} xs={12}>
          </Grid>
        </Grid>
      </Container>
     
    </>
  );
}

export default Dashboard;
