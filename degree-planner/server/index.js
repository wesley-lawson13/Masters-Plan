import express from 'express';
import cors from 'cors';

import schoolRoutes from './routes/schools.js';
import majorRoutes from './routes/majors.js';
import minorRoutes from './routes/minors.js';
import createPlanRoute from './routes/createPlan.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/schools', schoolRoutes);
app.use('/api/majors', majorRoutes);
app.use('/api/minors', minorRoutes);
app.use('/api/create-plan', createPlanRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});