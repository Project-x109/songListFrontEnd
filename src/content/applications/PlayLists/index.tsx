import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import Songs from './Songs';

function ManageMusic() {
  return (
    <>
      <Helmet>
        <title>Manage PlayLists</title>
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
          spacing={3}
        >
          <Grid item xs={12}>
            <Songs />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ManageMusic;
