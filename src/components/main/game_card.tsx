import { useContext, useEffect, useState } from 'react';
import {
  Card,
  Button,
  CardContent,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import Countdown from 'react-countdown';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import { useGlobalState } from '@/hooks/useGlobalState';
import { InfoModal } from './info_modal';
import { TicketModal } from './ticket_modal';
import { formatTime, getServerTime } from '@/utils/util';
import { SocketContext } from '@/context/SocketContext';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TimeFrame } from '@/anchor/constants';
// #1c1b20
const card_style = {
  borderRadius: '20px',
  backgroundColor: '#1B001B',
  padding: '0px',
  color: 'white',
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
};

export default function GameCard({ lottery, source, setSpot }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleTicketClose = () => setOpenTicketModal(false);
  const [hovered, setHovered] = useState(false);
  const [lotteryData, setLotteryData] = useState<any>();
  const [selectedLottery, setSelectLottery] = useState('');
  const [restTime, setRestTime] = useState<number>(5000);
  const [countdownTarget, setCountdownTarget] = useState<number>(Date.now() + 5000);
  const [winHistory, setWinHistory] = useState<any | null>(null);
  const [timeFrame, setTimeFrame] = useState<number>(1);

  const wallet = useWallet();
  const { newGame, message } = useContext(SocketContext);
  const { getUserData, getLotteryData, joinToLottery, getHistory } = useGlobalState();

  const isJoined = wallet.publicKey
  ? lottery?.account.participants.includes(wallet.publicKey.toString())
  : false;

  const joinLottery = async () => {
    if (!wallet.connected) {
      toast.info("Connect Your Wallet!", { position: 'top-center', autoClose: 7000 });
      return;
    }
    let userData = await getUserData();
    let lotteryData = await getLotteryData(lottery.publicKey.toString());
    let userSpotIndex = await TimeFrame.findIndex(timeframe => timeframe == Number(lotteryData.timeFrame));

    let userLotterySpot = userData?.spot[userSpotIndex];
    if (userLotterySpot > 0) {
      console.log("have ticket");
      let lotteryId = lotteryData.id;
      joinToLottery(lottery.publicKey.toString(), userSpotIndex, setSpot);
    } else {
      setOpenTicketModal(true);
      setSelectLottery(lottery.publicKey.toString());
    }
  };

  const getLotteryHistory = async () => {
    let lottery = lotteryData;
    let historyData = await getHistory(Number(lottery?.account.timeFrame));
    setTimeFrame(Number(lottery?.account.timeFrame));
    setWinHistory(historyData);
    setOpenModal(true);
  };

  useEffect(() => {
    setLotteryData(lottery);
    let timeFrame = Number(lottery.account.timeFrame);
    const setRestfulTime = async () => {
      let restTime = await getServerTime(timeFrame);

      setRestTime(restTime);
      setCountdownTarget(Date.now() + restTime);
    };
    setRestfulTime();
  }, [lottery, message]);

  return (
    <>
      {lottery ? (
        <Card
          sx={{ ...card_style }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <CardContent sx={{ padding: '0px' }}>
            <Box
              sx={{
                position: 'relative',
                backgroundColor: `rgb(0, 38, 153)`,
                backgroundImage: `url('/cardbg.svg')`,
                display: 'flex',
                alignItems: 'center',
                paddingY: '30px',
                justifyContent: 'center',
                backgroundPosition: 'center',
                backgroundSize: 'auto',
              }}
            >
              <InfoOutlinedIcon
                sx={{
                  position: 'relative',
                  left: '60%',
                  top: '-60px',
                  transform: hovered ? 'scale(1.2)' : 'scale(1)',
                }}
                onClick={getLotteryHistory}
              />
              <LazyLoadImage
                alt="card-bg"
                src={source}
                style={{
                  width: '120px',
                  height: '120px',
                  transform: hovered ? 'scale(1.4)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Box>
            <Box
              padding={2}
              sx={{ textAlign: 'center', fontFamily: 'Roboto,sans-serif' }}
            >
              <Typography variant="h2" color={'white'}>
                {formatTime(Number(lottery.account.timeFrame))}
              </Typography>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                marginTop={'7px'}
              >
                <AccessAlarmOutlinedIcon sx={{ mr: '6px' }} />
                <Countdown date={countdownTarget} />
              </Box>
              <Box display={'flex'} justifyContent={'center'} marginTop={'7px'}>
                <ConfirmationNumberOutlinedIcon />
                <Typography
                  variant="h5"
                  sx={{
                    alignItems: 'center',
                    marginBottom: '14px',
                    textAlign: 'center',
                    fontFamily: 'Roboto,sans-serif',
                  }}
                >
                  : {Number(lottery.account.ticketPrice / LAMPORTS_PER_SOL)} SOL
                </Typography>
              </Box>

              <Stack
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Typography
                  sx={{
                    color: '#ffcb52 ',
                    fontSize: '30px',
                    fontFamily: 'Roboto,sans-serif',
                    fontWeight: 'bold',
                  }}
                >
                  {Number(lottery.account.ticketPrice * lottery.account.maxTicket / LAMPORTS_PER_SOL).toFixed(2)} SOL
                </Typography>
              </Stack>

              <Typography
                variant="h5"
                color={'white'}
                sx={{ fontFamily: 'Roboto,sans-serif' }}
              >
                {Number(lottery.account.maxTicket)} Spots
              </Typography>

              <Stack
                sx={{ marginTop: '10px' }}
                display={'flex'}
                alignItems={'center'}
              >
                <Button
                  variant="contained"
                  onClick={joinLottery}
                  sx={{
                    backgroundColor: '#0eae07',
                    width: '160px',
                    height: '40px',
                    borderRadius: '10px',
                    fontFamily: 'Roboto,sans-serif',
                    fontSize: '18px',
                  }}
                >
                   {isJoined ? "Joined" : "Join"}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      ) : null}

      <InfoModal openModal={openModal} handleClose={handleClose} history={winHistory} timeframe={timeFrame} />
      <TicketModal openModal={openTicketModal} handleClose={handleTicketClose} lotteryPubkey={selectedLottery} setSpot = {setSpot}/>
    </>
  );
}
