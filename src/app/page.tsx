import prisma from "./prisma"
import { PieChart } from '@mui/x-charts';
import {Container,Typography,Card,TableContainer,TableHead,TableRow,Table,TableCell,Paper,TableBody} from "@mui/material"
import { red } from "@mui/material/colors";

export const dynamic = 'force-dynamic';
export default async function Home() {
  const totalVoteBupati = await prisma.totalvotes.findMany({
    where:{
      types:"bupati"
    },
    orderBy:{
      total_vote:"desc"
    }
  })

  const regionalCandidateVote = await prisma.regional_candidate_vote.findMany({
    include:{
      totalvotes:{
        select:{
          candidate_name:true,
        }
      },
    }
  });
  interface RegionalCandidateVote{
    id:number,
    candidate_name:string,
    regional_name:string,
    data_sirekap:number,
    data_quickcount:number,
    updated_at:string,
  }

  const regionalCandidateVoteData:RegionalCandidateVote[] = []
  regionalCandidateVote.forEach((val)=>{
    let candidateName = ""
    switch (val.candidate_id){
      case 1:
        candidateName = "Johannes Rettob"
      case 2:
        candidateName = "Maximus Tipagau"  
      case 3:
        candidateName = "Alex Omaleng"
      }
    regionalCandidateVoteData.push({
      id:val.id,
      candidate_name:candidateName,
      regional_name:val.regional_name??"",
      data_sirekap:Number(val.data_sirekap)??0,
      data_quickcount:Number(val.data_quickcount)??0,
      updated_at:new Date(val.updated_at??"").toDateString(),
})})

  interface VoteData{
    id:number,
    value:number,
    label:string
  }

  const pieDataBupati:VoteData[] = []

  totalVoteBupati.forEach((val)=>{
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

  totalVoteGubernur.forEach((val)=>{
    pieDataGubernur.push({id:val.id,value:Number(val.total_vote),label:val.candidate_name??""})
  })
  
  return (
    <Container>
      <Typography variant="h2">Bupati</Typography>
      <Container sx={{m:5}}>
        <Card sx={{ width: '100%',m:5}}>
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
        <Card sx={{m:5}}>
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
        <Card sx={{ width: '100%',m:5}}>
          <Typography sx={{p:2}} variant="h4" fontWeight={800}>Perbandingan data suara kabupaten - Bupati</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nama Kandidat</TableCell>
                  <TableCell>Kabupaten</TableCell>
                  <TableCell>Data Sirekap</TableCell>
                  <TableCell>Data QuickCount</TableCell>
                  <TableCell>Terakhir di update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {regionalCandidateVoteData.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.candidate_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.regional_name}
                    </TableCell>
                    <TableCell sx={{bgcolor:red}} component="th" scope="row">
                      {row.data_sirekap??0}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {Number(row.data_quickcount)??0}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.updated_at??""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </Container>
  );
}