import {
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import Text from 'src/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import {
  fetchCountRequestByGenre,
  fetchCountPopularArtist,
  fetchStatistics
} from 'src/redux/actions/statisticsAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/reducers/rootReducer';
import { DATA } from '../../../types';
const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
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

function SongAnalytics() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.counts.data);
  const stat = useSelector((state: RootState) => state.counts.statCount);
  const [chartData, setchartData] = useState([]);
  const [statData, setStatData] = useState<DATA | null>(null);
  useEffect(() => {
    if (!data || !stat || data.length === 0) {
      if (!data) {
        dispatch(fetchCountPopularArtist());
        dispatch(fetchCountRequestByGenre());
      }
      if (!stat) {
        dispatch(fetchStatistics());
      }
    } else {
      setchartData(data);
      setStatData(stat);
    }
  }, [dispatch, data, stat]);
  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#FF4C51', '#5c6ac0', '#16B1FF'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Number(val).toFixed(1) + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: chartData?.map((label) => label._id.toUpperCase()) || [],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };
  const chartSeries = chartData?.map((label) => label.count) || [];
  const images = {
    Rock: '/static/images/placeholders/logo/bitcoin.png',
    Pop: '/static/images/placeholders/logo/cardano.png',
    'Hip Hop': '/static/images/placeholders/logo/bitcoin.png',
    Country: '/static/images/placeholders/logo/ethereum.png',
    Electronic: '/static/images/placeholders/logo/bitcoin.png',
    default: '/static/images/placeholders/logo/default.png'
  };
  const alt = {
    Rock: 'Rock Music',
    Pop: 'Pop Music',
    'Hip Hop': 'Hip-Hop Music',
    Country: 'Country Music',
    Electronic: 'Electronic Music',
    default: 'Unknown Genre'
  };
  const dataWithImages =
    data?.slice(0, 4)?.map((item) => ({
      ...item,
      imageUrl: images[item._id] || images['default'],
      alt: alt[item._id] || alt['default']
    })) || [];
  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={3}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Songs
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                {statData?.songCount || '-'}
              </Typography>
            </Box>
          </Box>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Albums
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                {statData?.albumCount || '-'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Artists
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                {statData?.artistCount || '-'}
              </Typography>
            </Box>
          </Box>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Genres
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                {statData?.genreCount || '-'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{
              display: { xs: 'none', md: 'inline-block' }
            }}
          >
            <Divider absolute orientation="vertical" />
          </Box>
          <Box py={4} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid
                xs={12}
                sm={5}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Chart
                  height={250}
                  options={chartOptions}
                  series={chartSeries}
                  type="donut"
                />
              </Grid>
              <Grid xs={12} sm={7} item display="flex" alignItems="center">
                <List
                  disablePadding
                  sx={{
                    width: '100%'
                  }}
                >
                  {dataWithImages?.map((data, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemAvatarWrapper>
                        <img alt={data._id} src={data.imageUrl} />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary={data._id}
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                        secondary={data.alt}
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          noWrap: true
                        }}
                      />
                      <Box>
                        <Typography align="right" variant="h4" noWrap>
                          {data.count}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default SongAnalytics;
