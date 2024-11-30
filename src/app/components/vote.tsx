import { PieChart } from '@mui/x-charts';
import {Card} from "@mui/material"
import prisma from '../prisma';

interface VoteData{
    id:number,
    value:number,
    label:string
}

export default async function Vote(kec: string,kel:string,tps:string){
    const votes = await prisma.votes.findMany({
    where: {
        kecamatan: {
        equals: kec,
        },
        kelurahan: {
        equals: kel,
        },
        tps: {
        equals: tps,
        }
    }})

    const pieData:VoteData[] = []
    votes.forEach((val,i)=>{
        let name = ""
        if (Number(val.kandidat) ==1){
            name = "Johannes Rettob" 
        } else if (Number(val.kandidat) ==2){
            name = "Maximus Tipagau" 

        }else if (Number(val.kandidat) ==3){
            name = "Alex Omaleng"

        }
        pieData.push({id:i,value:Number(val.hasil_suara),label:name})
    })

    return (
        <Card sx={{height:300, width: '100%'}}>
            <PieChart
            width={500}
            title={tps}
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
    )
}