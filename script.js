'use strict';

let data = [
  {
    title: 'Work',
    timeframes: {
      daily: {
        current: 5,
        previous: 7,
      },
      weekly: {
        current: 32,
        previous: 36,
      },
      monthly: {
        current: 103,
        previous: 128,
      },
    },
  },
  {
    title: 'Play',
    timeframes: {
      daily: {
        current: 1,
        previous: 2,
      },
      weekly: {
        current: 10,
        previous: 8,
      },
      monthly: {
        current: 23,
        previous: 29,
      },
    },
  },
  {
    title: 'Study',
    timeframes: {
      daily: {
        current: 0,
        previous: 1,
      },
      weekly: {
        current: 4,
        previous: 7,
      },
      monthly: {
        current: 13,
        previous: 19,
      },
    },
  },
  {
    title: 'Exercise',
    timeframes: {
      daily: {
        current: 1,
        previous: 1,
      },
      weekly: {
        current: 4,
        previous: 5,
      },
      monthly: {
        current: 11,
        previous: 18,
      },
    },
  },
  {
    title: 'Social',
    timeframes: {
      daily: {
        current: 1,
        previous: 3,
      },
      weekly: {
        current: 5,
        previous: 10,
      },
      monthly: {
        current: 21,
        previous: 23,
      },
    },
  },
  {
    title: 'Self Care',
    timeframes: {
      daily: {
        current: 0,
        previous: 1,
      },
      weekly: {
        current: 2,
        previous: 2,
      },
      monthly: {
        current: 7,
        previous: 11,
      },
    },
  },
];

const buttons = [...document.querySelectorAll('.timeline')];

const listenToButtons = array => {
  array.forEach(button => {
    button.addEventListener('click', () => {
      activateClickedButton(button);
      const clickedOption = button.dataset.option;
      renderCards(clickedOption);
    });
  });
};

const activateClickedButton = function (button) {
  buttons.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
};

const loadData = async () => {
  // Fetch data
  const response = await fetch('./data.json');
  const fetchedData = await response.json();
  data = fetchedData;
  buttons[1].click();
};

const clearActivities = () => {
  // clear all activities from html
  const activities = document.querySelectorAll('.activities');
  activities.forEach(a => a.remove());
};

const renderCards = async clickedOption => {
  clearActivities();
  const activityTracker = document.querySelector('section.dashboard');

  const calcTimeframe = option => {
    if (option === 'daily') {
      return 'Yesterday';
    } else if (option === 'weekly') {
      return 'Last Week';
    } else if (option === 'monthly') {
      return 'Last Month';
    }
  };

  data.forEach(activity => {
    const name = activity.title;
    const activityClass = name.toLowerCase().replace(' ', '-');
    const timeframeData = activity.timeframes[clickedOption];
    const previousTimeframe = calcTimeframe(clickedOption);
    const section = document.createElement('section');
    section.classList.add('activities', activityClass);
    const stringToInject = `
      <div class="small-img">
        <img src="./images/icon-${activityClass}.svg" alt="">
      </div>
      <div class="duration">
        <div class="period">
          <h2 class="activity-title">${name}</h2>
          <img src="./images/icon-ellipsis.svg" alt="" class="ellipsis">
        </div>

        <div class="lasted">
          <h3 class="current-timeframe">${timeframeData.current}hrs</h3>
          <p class="time-window">${previousTimeframe} - ${timeframeData.previous}hrs</p>
        </div>
      </div>
    `;
    section.innerHTML = stringToInject;
    activityTracker.append(section);
  });
};

listenToButtons(buttons);
loadData();
