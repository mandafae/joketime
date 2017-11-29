
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'funnyguy1',
          hash: '$2a$12$IXNedwljHRdH8Y6VvN5vqObNVcMEYeNRgeWSeO1xGLjDS55POC.Cu',
          favorites: ["My dog used to chase people on a bike a lot. It got so bad I had to take his bike away.", "What kind of magic do cows believe in? MOODOO."]
      },
        {
          username: 'lolz',
          hash: '$2a$12$IXNedwljHRdH8Y6VvN5vqObNVcMEYeNRgeWSeO1xGLjDS55POC.Cu',
          favorites: ["What kind of magic do cows believe in? MOODOO."]
        },
        {
          username: 'hahaha',
          hash: '$2a$12$IXNedwljHRdH8Y6VvN5vqObNVcMEYeNRgeWSeO1xGLjDS55POC.Cu',
          favorites: ["What do you call a fly without wings? A walk.", "When my wife told me to stop impersonating a flamingo, I had to put my foot down.", "I went to the zoo the other day, there was only one dog in it. It was a shitzu."]
        }
      ]);
    });
};
