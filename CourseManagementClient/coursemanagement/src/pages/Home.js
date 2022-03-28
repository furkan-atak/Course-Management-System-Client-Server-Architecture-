import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';


export default function Home() {
    let history = useHistory();
    const handleClick = (path) => {
        history.push(path);
    }

  return (
    <form>
      <div className='parent'>
        <div className='child'>
            <Card sx={{ width: 345, height: 304 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    className='cardMedia'
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Courses
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Courses can be add, delete, update 
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={() => handleClick("/CourseList")} size="small" color="primary">
                        Show
                    </Button>
                </CardActions>
                
            </Card>
        </div>
        <div className='child'>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    className='cardMediaStu'
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Students
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Students can manage their course and department related issues.
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={() => handleClick("/student")} size="small" color="primary">
                        Show
                    </Button>
                </CardActions>
                
            </Card>
        </div>
        <div className='child'>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    className='cardMediaDept'
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Departments
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Departments can be managed in terms of adding removing and updating department.
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={() => handleClick("/department")} size="small" color="primary">
                        Show
                    </Button>
                </CardActions>
                
            </Card>
        </div>
        <div className='child'>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    className='cardMediaTeacher'
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Teachers
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Teachers can manage their course and department related issues.
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={() => handleClick("/teacher")} size="small" color="primary">
                    Show
                    </Button>
                </CardActions>
                
            </Card>
        </div>
        
       </div>
    </form>
    
  );
}