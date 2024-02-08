import {
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  styled
} from '@mui/material';
import { fetchCountPopularArtist } from 'src/redux/actions/statisticsAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/reducers/rootReducer';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

function PopularArtists() {
  const dispatch = useDispatch();
  const artists = useSelector((state: RootState) => state.counts.artists);
  const [chartData, setchartData] = useState([]);
  useEffect(() => {
    if (artists == null || artists?.length <= 0) {
      dispatch(fetchCountPopularArtist());
    } else {
      setchartData(artists);
    }
  }, [dispatch, artists]);

  const images = {
    'Marthin Garrix': '/static/images/placeholders/logo/cardano.png',
    Nicky: '/static/images/placeholders/logo/bitcoin.png',
    'The Byrds': '/static/images/placeholders/logo/ethereum.png',
    check: '/static/images/placeholders/logo/bitcoin.png',
    default: '/static/images/placeholders/logo/default.png'
  };

  const alt = {
    'Marthin Garrix': 'Pop Music',
    Nicky: 'Hip-Hop Music',
    'The Byrds': 'Country Music',
    check: 'Electronic Music',
    default: 'Unknown Artist'
  };

  const dataWithImages =
    chartData?.slice(0, 4).map((item) => ({
      ...item,
      imageUrl: images[item._id] || images['default'],
      alt: alt[item._id] || alt['default']
    })) || [];
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">Popular Artists</Typography>
      </Box>
      <Grid container spacing={3}>
        {dataWithImages.map((data, index) => (
          <Grid xs={12} key={index} sm={6} md={3} item>
            <Card
              sx={{
                px: 1
              }}
            >
              <CardContent>
                <AvatarWrapper>
                  <img alt={data.alt} src={data.imageUrl} />
                </AvatarWrapper>
                <Typography variant="h5" noWrap>
                  {data._id}
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  artist
                </Typography>
                <Box
                  sx={{
                    pt: 3
                  }}
                >
                  <Typography variant="h3" gutterBottom noWrap>
                    {data.count + ' Songs'}
                  </Typography>
                  <Typography variant="subtitle2" noWrap>
                    {data.alt}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default PopularArtists;
