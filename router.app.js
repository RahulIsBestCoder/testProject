const express = require("express");
const app = express();
const userRouter=require("./src/domain/user_section/route/user_route")
// app.disable('x-powered-by')

// import { manage_service_routing } from "./domain/manage_services/route/manage_services_routes";
// import { manage_odr_routing } from "./domain/manage_odr/route/manage_odr_routes";
// import { manage_student_routing } from "./domain/manage_student/route/manage_student_routes";

app.use('/user', userRouter);



export const app_route = app;