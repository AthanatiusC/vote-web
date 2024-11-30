import prisma from '../prisma';
import {Card,Typography, Box} from "@mui/material"
import Vote from './vote';

export default async function TPS(kec: string,kel:string){   
    const tps = await prisma.votes.findMany({
        select:{
            tps:true
        },
        distinct:['tps'],
        where: {
            kecamatan: {
            equals: kec,
            },
            kelurahan: {
            equals: kel,
            }
        }
    })
    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: {xs:'column', md: 'row'}, justifyContent: 'space-between', m: 2 }} >
                {tps.map((data)=>(
                    <Card key={data.tps}>
                        <Typography variant='h4' fontWeight={800} textAlign={'center'}>TPS : {data.tps}</Typography>
                        {Vote(kec,kel,data.tps??'')}
                    </Card>
                ))}
            </Box>

        </div>
    )
}