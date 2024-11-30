import prisma from "./prisma"
import { PieChart } from '@mui/x-charts';
import {Container,Typography,Divider,Card} from "@mui/material"

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
      <br />
          <Typography variant="h4">TOTAL</Typography>
          <Divider></Divider>
          <Card sx={{height:300, width: '100%'}}>
            <PieChart
            width={500}
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