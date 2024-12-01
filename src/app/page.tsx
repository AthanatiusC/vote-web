import prisma from "./prisma"
import { PieChart } from '@mui/x-charts';
import {Container,Typography,Card,TableContainer,TableHead,TableRow,Table,TableCell,Paper,TableBody} from "@mui/material"
import { space } from "postcss/lib/list";

export default async function Home() {
  const totalVote = await prisma.totalvotes.findMany()
  interface VoteData{
    id:number,
    value:number,
    label:string
}

  const pieData:VoteData[] = []

  totalVote.forEach((val,i)=>{
      pieData.push({id:i,value:Number(val.total_vote),label:val.candidate_name})
  })

  
  return (
    <Container>
      <Typography variant="h2">Vote Monitoring</Typography>
      <br/>
        <Card sx={{ width: '100%',mb:5}}>
          <Typography sx={{p:2}} variant="h4" fontWeight={800}>Quick Count Data</Typography>
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
              {pieData.map((row) => (
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
        <Typography sx={{p:2}} variant="h4" fontWeight={800}>Quick Count Overview</Typography>
        <PieChart
          width={500}
          height={300}
          series={[
          {
            data: pieData,
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
  );
}