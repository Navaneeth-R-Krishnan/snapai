import express from "express";
import { TrainModel, GenerateImage, GenerateImagesFromPack } from "common/types";
import { prismaClient } from "db";
import { FalAIModel } from "./models/FalAIModel";
import { authMiddleware } from "./middleware";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
const falAiModel = new FalAIModel();

app.post("/ai/training", authMiddleware, async (req, res) => {
    const parsedBody = TrainModel.safeParse(req.body);
    console.log(req.userId);
    if (!parsedBody.success) {
      res.status(411).json({
        message: "Input incorrect",
      });
      return;
    }
  
    const { request_id, response_url } = await falAiModel.trainModel(
      parsedBody.data.zipUrl,
      parsedBody.data.name
    );
  
    const data = await prismaClient.model.create({
      data: {
        name: parsedBody.data.name,
        type: parsedBody.data.type,
        age: parsedBody.data.age,
        ethinicity: parsedBody.data.ethinicity,
        eyeColor: parsedBody.data.eyeColor,
        bald: parsedBody.data.bald,
        userId: req.userId!,
        zipUrl: parsedBody.data.zipUrl,
        falAiRequestId: request_id,
      },
    });
  
    res.json({
      modelId: data.id,
    });
  });

app.post("/ai/generate",(req,res)=>{

})

app.post("pack/generate",(req,res)=>{

})

app.get("/pack/bulk",(req,res)=>{
    
})

app.get("/image",(req,res)=>{
    
})

app.listen(PORT,()=>{
    console.log("Server is on 3000");
});
