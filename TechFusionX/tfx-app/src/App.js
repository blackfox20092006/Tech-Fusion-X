import * as React from "react"
import CssBaseline from "@mui/joy/CssBaseline"
import Autocomplete from "@mui/joy/Autocomplete"
import Avatar from "@mui/joy/Avatar"
import Box from "@mui/joy/Box"
import Chip from "@mui/joy/Chip"
import ChipDelete from "@mui/joy/ChipDelete"
import Typography from "@mui/joy/Typography"
import Input from "@mui/joy/Input"
import IconButton from "@mui/joy/IconButton"
import Button from "@mui/joy/Button"
import List from "@mui/joy/List"
import ListSubheader from "@mui/joy/ListSubheader"
import Divider from "@mui/joy/Divider"
import ListItem from "@mui/joy/ListItem"
import ListItemButton from "@mui/joy/ListItemButton"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import ListItemContent from "@mui/joy/ListItemContent"
import RadioGroup from "@mui/joy/RadioGroup"
import Radio from "@mui/joy/Radio"
import Slider from "@mui/joy/Slider"
import Sheet from "@mui/joy/Sheet"
import Pagination from "@mui/material/Pagination"
import {
  CssVarsProvider as JoyCssVarsProvider,
  useColorScheme as useJoyColorScheme
} from "@mui/joy/styles"
import { 
  useColorScheme as useMaterialColorScheme,
  experimental_extendTheme as extendMaterialTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID
} from '@mui/material/styles';

// Icons import
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import WifiPasswordRoundedIcon from "@mui/icons-material/WifiPasswordRounded"
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded"
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded"
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded"
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"
import MenuIcon from "@mui/icons-material/Menu"
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded"
import InstagramIcon from "@mui/icons-material/Instagram"
import VerifiedIcon from '@mui/icons-material/Verified';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// custom
import teamTheme from "./theme"
import Layout from "./components/Layout.js"
import { Icon, Link, Stack } from "@mui/material"


function ColorSchemeToggle() {
  const { mode, setMode: setMaterialMode } = useMaterialColorScheme();
  const { setMode: setJoyMode } = useJoyColorScheme();
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="primary"
      onClick={() => {
        setMaterialMode(mode === 'dark' ? 'light' : 'dark');
        setJoyMode(mode === 'dark' ? 'light' : 'dark');
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  )
}


function MenuNav({ onSelect }) {
  return (
    <List size="sm" sx={{ "--ListItem-radius": "8px", "--List-gap": "4px" }}>
      <ListItem nested>
        <ListItem>
          <ListItemButton 
          variant="soft" 
          color="primary"
          onClick={() => onSelect("home")}>
            <ListItemDecorator sx={{ color: "inherit" }}>
              <HomeRoundedIcon fontSize="small" />
            </ListItemDecorator>
            <ListItemContent>Trang chủ</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListSubheader>
          Hướng dẫn
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ "--IconButton-size": "24px", ml: "auto" }}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" }
          }}
        >
          <ListItem>
            <ListItemButton 
            onClick = {() => onSelect("network")}>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <WifiPasswordRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Bảo mật mạng</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton 
            onClick = {() => onSelect("security")}>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
              <WarningAmberRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Nhận diện mối nguy hiểm trực tuyến</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
        <ListSubheader>
          Function
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ "--IconButton-size": "24px", ml: "auto" }}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" }
          }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
              <RemoveCircleOutlineIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Chặn website nguy hiểm</ListItemContent>
              <Chip
                variant="soft"
                color="info"
                size="sm"
                sx={{ borderRadius: "sm" }}
              >
                Coming soon
              </Chip>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
              <FamilyRestroomIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Quản lý trẻ nhỏ</ListItemContent>
              <Chip
                variant="soft"
                color="info"
                size="sm"
                sx={{ borderRadius: "sm" }}
              >
                Coming soon
              </Chip>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
              <SmartToyIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Chat AI</ListItemContent>
              <Chip
                variant="soft"
                color="info"
                size="sm"
                sx={{ borderRadius: "sm" }}
              >
                Coming soon
              </Chip>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  )
}

function TrangChu() {
  const [selectedKey, setSelectedKey] = React.useState(false)

  const handleSelect = (key) => {
    setSelectedKey(key)
  }

  return ( 
    <List
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 2
      }}>

      {[...Array(1)].map((_, index) => (
        <Sheet
          key={index}
          component="li"
          variant="outlined"
          sx={{
            borderRadius: "sm",
            p: 2,
            listStyle: "none"
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar
              src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-1/362537617_1022116105895068_9131130494044053017_n.jpg?stp=c0.237.320.320a_dst-jpg_p320x320&_nc_cat=105&cb=99be929b-3346023f&ccb=1-7&_nc_sid=7206a8&_nc_ohc=MyN8ZRBEV8sAX_JY2Xv&_nc_oc=AQlO4LK53E34wDSY4H4MNPrRNsH4NXCC20tj_4E4vgvtL4Kvaufx6fLLPiZTRW79MJA&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfDVa1kCn_ecKxzNHZHBLtTMIQXGudgpEMHY1HmLrKU2eQ&oe=64C8E126"
              srcSet="https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-1/362537617_1022116105895068_9131130494044053017_n.jpg?stp=c0.237.320.320a_dst-jpg_p320x320&_nc_cat=105&cb=99be929b-3346023f&ccb=1-7&_nc_sid=7206a8&_nc_ohc=MyN8ZRBEV8sAX_JY2Xv&_nc_oc=AQlO4LK53E34wDSY4H4MNPrRNsH4NXCC20tj_4E4vgvtL4Kvaufx6fLLPiZTRW79MJA&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfDVa1kCn_ecKxzNHZHBLtTMIQXGudgpEMHY1HmLrKU2eQ&oe=64C8E126 2x"
              sx={{ borderRadius: "sm" }}
            />
            <Box>
              <Typography>Hoàng Quang Nhân <VerifiedIcon fontSize="small"/> </Typography>
              <Typography level="body3">Backend</Typography>
            </Box>
          </Box>
          <Divider component="div" sx={{ my: 2 }} />
          <List sx={{ "--ListItemDecorator-size": "48px" }}>
            <ListItem sx={{ alignItems: "flex-start" }}>
              <ListItemDecorator>
                <Avatar
                  size="sm"
                  src="./img/Logo.svg"
                />
              </ListItemDecorator>
              <ListItemContent>
                <Typography fontSize="sm">Junior Developer</Typography>
                <Typography level="body3">Tech Fusion X</Typography>
              </ListItemContent>
              <Typography level="body2">2023</Typography>
            </ListItem>
          </List>
          <Typography fontSize="sm">Social:</Typography>
          <Link href="https://www.facebook.com/blackfox0000">
            <Button
              size=""
              variant="plain"
              endDecorator={
                <FacebookRoundedIcon fontSize="medium" />
              }
              sx={{ px: 8, mt: 1 }}
            >
            </Button>
          </Link>
          <Link href="https://www.instagram.com/quangnhan2009.2006/">
            <Button
              size=""
              variant="plain"
              endDecorator={
                <InstagramIcon style={{ color: "pink"}} fontSize="medium" />
              }
              sx={{ px: 8, mt: 1 }}
            >
            </Button>
          </Link>
          <Divider component="div" sx={{ my: 2 }} />
          <Typography fontSize="sm">Skills tags:</Typography>
          <Box sx={{ mt: 1.5, display: "flex", gap: 1 }}>
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{ borderRadius: "sm" }}
            >
              Algorithmics
            </Chip>
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{ borderRadius: "sm" }}
            >
              Alphanumeric data
            </Chip>
          </Box>
        </Sheet>
      ))}

      {[...Array(1)].map((_, index) => (
        <Sheet
          key={index}
          component="li"
          variant="outlined"
          sx={{
            borderRadius: "sm",
            p: 2,
            listStyle: "none"
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar
              src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/356350046_10222000376254330_4411978665102180236_n.jpg?_nc_cat=104&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LWEMhfWCfoEAX-l7mdP&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfCGvcgy3Y2UgRTYwfN4qstsBmhdFBUvdh-5AffXMoSalA&oe=64C81702"
              srcSet="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/356350046_10222000376254330_4411978665102180236_n.jpg?_nc_cat=104&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LWEMhfWCfoEAX-l7mdP&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfCGvcgy3Y2UgRTYwfN4qstsBmhdFBUvdh-5AffXMoSalA&oe=64C81702 2x"
              sx={{ borderRadius: "sm" }}
            />
            <Box>
              <Typography>Trần Thanh Trọng <VerifiedIcon fontSize="small"/></Typography>
              <Typography level="body3">Frontend</Typography>
            </Box>
          </Box>
          <Divider component="div" sx={{ my: 2 }} />
          <List sx={{ "--ListItemDecorator-size": "48px" }}>
            <ListItem sx={{ alignItems: "flex-start" }}>
              <ListItemDecorator>
                <Avatar
                  size="sm"
                  src="./img/Logo.svg"
                />
              </ListItemDecorator>
              <ListItemContent>
                <Typography fontSize="sm">Junior Developer</Typography>
                <Typography level="body3">Tech Fusion X</Typography>
              </ListItemContent>
              <Typography level="body2">2023</Typography>
            </ListItem>
          </List>
          <Typography fontSize="sm">Social:</Typography>
          <Link href="https://www.facebook.com/th.trog">
            <Button
              size=""
              variant="plain"
              endDecorator={
                <FacebookRoundedIcon fontSize="medium" />
              }
              sx={{ px: 8, mt: 1 }}
            >
            </Button>
          </Link>
          <Link href="https://www.instagram.com/th.trog/">
            <Button
              size=""
              variant="plain"
              endDecorator={
                <InstagramIcon style={{ color: "pink"}} fontSize="medium" />
              }
              sx={{ px: 8, mt: 1 }}
            >
            </Button>
          </Link>
          <Divider component="div" sx={{ my: 2 }} />
          <Typography fontSize="sm">Skills tags:</Typography>
          <Box sx={{ mt: 1.5, display: "flex", gap: 1 }}>
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{ borderRadius: "sm" }}
            >
              Network Administrators
            </Chip>
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{ borderRadius: "sm" }}
            >
              UI Design
            </Chip>
          </Box>
        </Sheet>
      ))}

      {[...Array(1)].map((_, index) => (
        <Sheet
          key={index}
          component="li"
          variant="outlined"
          sx={{
            borderRadius: "sm",
            p: 2,
            listStyle: "none"
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar
              src="https://scontent-xsp1-2.xx.fbcdn.net/v/t39.30808-6/359490081_884878696585592_8101885281041392057_n.jpg?_nc_cat=101&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4kAb-uwULCsAX_gZNDK&_nc_ht=scontent-xsp1-2.xx&oh=00_AfA7y30qep_48Ab2sCMFxbk88ehd1sCZRw6_T8RBPF6-Yg&oe=64C852C2"
              srcSet="https://scontent-xsp1-2.xx.fbcdn.net/v/t39.30808-6/359490081_884878696585592_8101885281041392057_n.jpg?_nc_cat=101&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4kAb-uwULCsAX_gZNDK&_nc_ht=scontent-xsp1-2.xx&oh=00_AfA7y30qep_48Ab2sCMFxbk88ehd1sCZRw6_T8RBPF6-Yg&oe=64C852C2 2x"
              sx={{ borderRadius: "sm" }}
            />
            <Box>
              <Typography>Võ Bảo Thy <VerifiedIcon fontSize="small"/></Typography>
              <Typography level="body3">Tester</Typography>
            </Box>
          </Box>
          <Divider component="div" sx={{ my: 2 }} />
          <List sx={{ "--ListItemDecorator-size": "48px" }}>
            <ListItem sx={{ alignItems: "flex-start" }}>
              <ListItemDecorator>
                <Avatar
                  size="sm"
                  src="./img/Logo.svg"
                />
              </ListItemDecorator>
              <ListItemContent>
                <Typography fontSize="sm">Content Editor</Typography>
                <Typography level="body3">Tech Fusion X</Typography>
              </ListItemContent>
              <Typography level="body2">2023</Typography>
            </ListItem>
          </List>
          <Typography fontSize="sm">Social:</Typography>
          <Link href="https://www.facebook.com/baothy.vo.7359">
            <Button
              size=""
              variant="plain"
              endDecorator={
                <FacebookRoundedIcon fontSize="medium" />
              }
              sx={{ px: 8, mt: 1 }}
            >
            </Button>
          </Link>
          <Link href="https://www.instagram.com/">
            <Button
              size=""
              variant="plain"
              endDecorator={
                <InstagramIcon style={{ color: "pink"}} fontSize="medium" />
              }
              sx={{ px: 8, mt: 1 }}
            >
            </Button>
          </Link>
          <Divider component="div" sx={{ my: 2 }} />
          <Typography fontSize="sm">Skills tags:</Typography>
          <Box sx={{ mt: 1.5, display: "flex", gap: 1 }}>
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{ borderRadius: "sm" }}
            >
              Present
            </Chip>
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{ borderRadius: "sm" }}
            >
              Product Reviews 
            </Chip>
          </Box>
        </Sheet>
      ))}
    </List>
  )
}

function BaoMatMang() {
  const contentArray = [
    <>
      👍Xác thực tài khoản: Hướng dẫn người dùng tạo mật khẩu mạnh và kích hoạt các tính năng xác thực hai bước để bảo vệ tài khoản trên mạng xã hội và các ứng dụng di động.
      <br/>
      🔐Bảo mật thông tin cá nhân: Hướng dẫn không chia sẻ thông tin nhạy cảm như số điện thoại, địa chỉ nhà hay thông tin tài chính trên các trang web hay ứng dụng không tin cậy.
      <br/>
      💢Kiểm tra quyền truy cập ứng dụng: Hướng dẫn người dùng kiểm tra và quản lý quyền truy cập thông tin cá nhân trên các ứng dụng di động để tránh việc lộ thông tin không cần thiết.
      <br/>
      ⁉️Cẩn trọng với thông tin giả mạo: Hướng dẫn nhận diện và tránh chia sẻ thông tin giả mạo, tin đồn hoặc tin tức không xác thực trên mạng xã hội.
      <br/>
      🚀Chia sẻ trực tuyến: Hướng dẫn người dùng cân nhắc trước khi chia sẻ thông tin, hình ảnh hoặc video cá nhân trên mạng xã hội, đảm bảo rằng nó không gây hại cho bản thân hoặc người khác.
      <br/>
      ⚠️Tránh rơi vào các chiêu trò lừa đảo: Hướng dẫn phân biệt các cuộc gọi, tin nhắn hoặc email lừa đảo, tránh tiết lộ thông tin cá nhân hoặc tài chính cho các tin tặc.
      <br/>
      🔗Kiểm tra địa chỉ URL: Hướng dẫn kiểm tra và xác nhận địa chỉ URL trước khi truy cập vào trang web, tránh việc rơi vào các trang web giả mạo để đánh cắp thông tin.
      <br/>
      🎮Cân nhắc trước khi tham gia trò chơi trực tuyến: Hướng dẫn cân nhắc tuổi tham gia và đánh giá tính hợp lệ của trò chơi trực tuyến, tránh các trò chơi không phù hợp với độ tuổi của người dùng.
      <br/>
      ✨Bảo mật trình duyệt: Hướng dẫn người dùng cập nhật trình duyệt và các tiện ích bảo mật để tránh lỗ hổng bảo mật và tấn công từ phía người dùng.
      <br/>
      💬Báo cáo hành vi đáng ngờ: Hướng dẫn người dùng báo cáo những hành vi đáng ngờ, tin nhắn spam hoặc nội dung không phù hợp cho nhà cung cấp dịch vụ để giúp tạo môi trường an toàn cho cộng đồng trực tuyến.
    </>,
  ];

  const itemsPerPage = 1; // Số lượng đoạn văn bản hiển thị trên mỗi trang
  const totalPages = Math.ceil(contentArray.length / itemsPerPage); // Tổng số trang

  const [currentPage, setCurrentPage] = React.useState(0);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage - 1); // Trừ 1 vì Pagination tính từ 1, còn mảng tính từ 0
  };

  const getPageContent = (pageIndex) => {
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageContent = contentArray.slice(startIndex, endIndex); // Không cần nối mảng, để JSX tự render xuống dòng
    return pageContent;
  };

  return (
    <>
      {/*<Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          mb: 2,
        }}
      >
        Bảo mật mạng
      </Typography>*/}
      <div>
        <Typography sx={{ p: 2 }}>
          {getPageContent(currentPage)}
      </Typography>

        <div style={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination count={totalPages} page={currentPage + 1} onChange={handlePageChange} />
        </div>
      </div>
    </>
  )
}

function NhanDienMoiNguyHiemTrucTuyen() {
  const contentArray = [
    <>
      Tình huống 1 : Trẻ em nhận lời kết bạn từ một người lạ trên mạng xã hội và sau đó người này cố gắng thu thập thông tin cá nhân của trẻ thông qua những câu hỏi tinh vi.
      <br/>
      <br/>
      Cách phòng tránh:
      <br/>
      <br/>
      a.Hướng dẫn trẻ em không kết bạn với người lạ
      <br/>
      <br/>
      b.Giáo dục về các kỹ thuật lừa đảo trực tuyến
      <br/>
      <br/>
      c.Báo cáo và hỏi ý kiến người lớn
      <br/>
      <br/>
      d.Kiểm tra cài đặt quyền riêng tư
      <br/>
      <br/>
      e.Chọn một tên người dùng an toàn
      <br/>
      <br/>
      f.Sử dụng mạng xã hội phù hợp với độ tuổi
    </>,
    <>
      Tình huống 2 : Một nhóm bạn trong lớp gửi tin nhắn trực tuyến bắt nạt đến một bạn học viên khác, chia sẻ hình ảnh xấu xa và gây tổn thương tâm lý cho đồng học của họ.
      <br/>
      <br/>
      Cách phòng tránh:
      <br/>
      <br/>
      a.Giáo dục về tác động của bạo lực trực tuyến
      <br/>
      <br/>
      b.Khuyến khích tạo ra môi trường học tập tích cực
      <br/>
      <br/>
      c.Bảo vệ quyền riêng tư trực tuyến
      <br/>
      <br/>
      d.Không tham gia vào hành vi bắt nạt
      <br/>
      <br/>
      e.Báo cáo hành vi bắt nạt
      <br/>
      <br/>
      f.Tăng cường sự can thiệp của người lớn
      <br/>
      <br/>
      g.Khám phá tình bạn trong lớp học
    </>,
    <>
      Tình huống 3 : Trẻ em tìm thấy một trang web trò chơi trực tuyến miễn phí, nhưng sau đó phát hiện ra rằng các trò chơi này yêu cầu thông tin tài khoản cá nhân và thông tin tín dụng.
      <br/>
      <br/>
      Cách phòng tránh:
      <br/>
      <br/>
      a.Dừng ngay việc cung cấp thông tin
      <br/>
      <br/>
      b.Thông báo ngay lập tức cho người lớn
      <br/>
      <br/>
      c.Xác minh tính đáng tin cậy của trang web
      <br/>
      <br/>
      d.Học cách xử lý thông tin cá nhân
      <br/>
      <br/>
      e.Sử dụng các trang web trò chơi đáng tin cậy
      <br/>
      <br/>
      f.Xem xét cài đặt quyền riêng tư
      <br/>
      <br/>
      g.Đưa ra lựa chọn an toàn
      <br/>
      <br/>
      h.Tìm sự hỗ trợ từ người lớn
    </>,
    <>
      Tình huống 4 : Một bạn trong lớp chụp ảnh hoặc quay video trái phép của một trẻ em khác trong lớp, sau đó chia sẻ nó trên mạng xã hội.
      <br/>
      <br/>
      Cách phòng tránh:
      <br/>
      <br/>
      a.Gây ý thức về hậu quả của việc vi phạm quyền riêng tư
      <br/>
      <br/>
      b.Khuyến khích trẻ em không tham gia vào hành vi vi phạm quyền riêng tư
      <br/>
      <br/>
      c.Tạo môi trường học tập tích cực
      <br/>
      <br/>
      d.Báo cáo ngay khi phát hiện
      <br/>
      <br/>
      e.Thảo luận về việc sử dụng trí tưởng tượng đúng đắn
      <br/>
      <br/>
      f.Khám phá tình bạn và lòng tin
      <br/>
      <br/>
      g.Tăng cường hỗ trợ từ phụ huynh và giáo viên
    </>,
  ];

  const itemsPerPage = 1; // Số lượng đoạn văn bản hiển thị trên mỗi trang
  const totalPages = Math.ceil(contentArray.length / itemsPerPage); // Tổng số trang

  const [currentPage, setCurrentPage] = React.useState(0);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage - 1); // Trừ 1 vì Pagination tính từ 1, còn mảng tính từ 0
  };

  const getPageContent = (pageIndex) => {
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageContent = contentArray.slice(startIndex, endIndex); // Không cần nối mảng, để JSX tự render xuống dòng
    return pageContent;
  };

  return (
    <>
      <div>
        <Typography sx={{ p: 2 }}>
          {getPageContent(currentPage)}
      </Typography>

        <div style={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination count={totalPages} page={currentPage + 1} onChange={handlePageChange} />
        </div>
      </div>
    </>
  )
}

const materialTheme = extendMaterialTheme();

export default function App() {
  const [selectedKey, setSelectedKey] = React.useState("home");

  const handleSelect = (key) => {
    setSelectedKey(key);
  };
  // Dựa vào selectedKey, hiển thị component tương ứng
  return (
    <MaterialCssVarsProvider disableTransitionOnChange theme={{ [THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider theme={teamTheme}>
        <CssBaseline enableColorScheme/>
        <Layout.Root 
          sx={{
            ...(selectedKey && {
              height: "100vh",
              overflow: "hidden"
            })
          }}
        >
          <Layout.Header>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1.5
              }}
            >
              <IconButton
                variant="outlined"
                size="sm"
                onClick={() => setSelectedKey(true)}
                sx={{ display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                size="sm"
                variant="solid"
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
              <DevicesRoundedIcon />
              </IconButton>
              <Typography component="h1" fontWeight="xl">
                Tech Fusion X
              </Typography>
            </Box>
            <Input
              size="sm"
              placeholder="Tính năng tìm kiếm sẽ được cập nhập sau..."
              startDecorator={<SearchRoundedIcon color="primary" />}
              endDecorator={
                <IconButton variant="outlined" size="sm" color="neutral">
                  <Typography
                    fontWeight="lg"
                    fontSize="sm"
                    textColor="text.tertiary"
                  >
                    /
                  </Typography>
                </IconButton>
              }
              sx={{
                flexBasis: "500px",
                display: {
                  xs: "none",
                  sm: "flex"
                }
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
              <IconButton
                size="sm"
                variant="outlined"
                color="primary"
                sx={{ display: { xs: "inline-flex", sm: "none" } }}
              >
                <SearchRoundedIcon />
              </IconButton>
              <ColorSchemeToggle />
            </Box>
          </Layout.Header>
          <Layout.SideNav >
            <MenuNav selectedKey={selectedKey} onSelect={handleSelect}/>
          </Layout.SideNav>
          <Layout.Main>
            {selectedKey === "home" && <TrangChu />}
            {selectedKey === "network" && <BaoMatMang />}
            {selectedKey === "security" && <NhanDienMoiNguyHiemTrucTuyen />}
          </Layout.Main>
        </Layout.Root>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  )
}