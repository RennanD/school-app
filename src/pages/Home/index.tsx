import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Grid } from '@material-ui/core';
import { cards } from './cards';

// import { Container } from './styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  createButton: {
    color: ' #4caf50',
  },
});

const Home: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();

  const handleNaviagte = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history],
  );

  return (
    <Grid container spacing={3}>
      {cards.map(card => (
        <Grid item xs={12} sm={4}>
          <Card key={card.title} className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                alt="Contemplative Reptile"
                image={card.banner}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => {
                  handleNaviagte(card.create);
                }}
                size="small"
                color="primary"
              >
                Criar
              </Button>
              <Button
                onClick={() => {
                  handleNaviagte(card.list);
                }}
                size="small"
                color="default"
              >
                Listar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
