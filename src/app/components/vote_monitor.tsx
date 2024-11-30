import prisma from "../prisma"
import {Typography,Divider} from "@mui/material"
import TPS from "./tps";

export default async function VoteMonitoring(){
    const kecamatan = await prisma.votes.findMany({
        select:{
          kecamatan:true
        },
        distinct:['kecamatan']
      })
    
      const kelurahan = await prisma.votes.findMany({
        select:{
          kelurahan:true
        },
        distinct:['kelurahan']
      })
    return (
        <div>
        {kecamatan.map((kec)=>(
            <div key={kec.kecamatan}>
            <Typography variant="h4">Kecamatan {kec.kecamatan}</Typography>
            <Divider></Divider>
            {kelurahan.map((kel)=>(
                <div key={kel.kelurahan}>
                <Typography variant="h5">Kel. {kel.kelurahan}</Typography>
                <Divider></Divider>
                {TPS(kec.kecamatan??'',kel.kelurahan??'')}
                </div>
            ))}
            </div>
        ))}
        </div>
    )
}