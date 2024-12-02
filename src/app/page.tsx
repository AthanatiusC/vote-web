import prisma from "./prisma"
import { PieChart } from '@mui/x-charts';
import {Container,Typography,Card,TableContainer,TableHead,TableRow,Table,TableCell,Paper,TableBody} from "@mui/material"

export default async function Home() {
  const totalVoteBupati = await prisma.totalvotes.findMany({
    where:{
      types:"bupati"
    },
    orderBy:{
      total_vote:"desc"
    }
  })
  interface VoteData{
    id:number,
    value:number,
    label:string
}

  const pieDataBupati:VoteData[] = []

  totalVoteBupati.forEach((val,i)=>{
    pieDataBupati.push({id:val.id,value:Number(val.total_vote),label:val.candidate_name??""})
  })


  const totalVoteGubernur = await prisma.totalvotes.findMany({
    where:{
      types:"gubernur"
    },
    orderBy:{
      total_vote:"desc"
    }
  })
  interface VoteData{
    id:number,
    value:number,
    label:string
}

  const pieDataGubernur:VoteData[] = []

  totalVoteGubernur.forEach((val,i)=>{
    pieDataGubernur.push({id:val.id,value:Number(val.total_vote),label:val.candidate_name??""})
  })
  
  return (
    <Container>
      <Typography variant="h2">Gubernur</Typography>
      <Container sx={{m:5}}>
        <Card sx={{ width: '100%',mb:5}}>
          <Typography sx={{p:2}} variant="h4" fontWeight={800}>Quick Count Data - Gubernur</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Candidate Name</TableCell>
                  <TableCell>Total Vote</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pieDataGubernur.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.label}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Card>
          <Typography sx={{p:2}} variant="h4" fontWeight={800}>Quick Count Overview - Gubernur</Typography>
          <PieChart
            width={500}
            height={300}
            series={[
            {
              data: pieDataGubernur,
              innerRadius: 20,
              outerRadius: 100,
              paddingAngle: 1,
              cornerRadius: 4,
              startAngle: 0,
              endAngle: 360,
              cx: 150,
              cy: 150,
            }
            ]}
            />
        </Card>
      </Container>
      <Typography variant="h2">Bupati</Typography>
      <Container sx={{m:5}}>
        <Card sx={{ width: '100%',mb:5}}>
          <Typography sx={{p:2}} variant="h4" fontWeight={800}>Quick Count Data - Bupati</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Candidate Name</TableCell>
                  <TableCell>Total Vote</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pieDataBupati.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.label}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Card>
          <Typography sx={{p:2}} variant="h4" fontWeight={800}>Quick Count Overview - Bupati</Typography>
          <PieChart
            width={500}
            height={300}
            series={[
            {
              data: pieDataBupati,
              innerRadius: 20,
              outerRadius: 100,
              paddingAngle: 1,
              cornerRadius: 4,
              startAngle: 0,
              endAngle: 360,
              cx: 150,
              cy: 150,
            }
            ]}
            />
        </Card>
      </Container>
    </Container>
  );
}