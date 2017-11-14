var seeder = require('mongoose-seed');

seeder.connect('mongodb://localhost/watson', function() {
    seeder.loadModels([
        './models/user.js'
    ]);

    seeder.clearModels(['User'], function() {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function() {
            //seeder.disconnect();
        });
    });
});

var data = [{
        "model": "User",
        "documents": [{
                "name": "wassupper",
                "email": "tester@gmail.com",
                "password": "password11"
            },
            {
                "name": "raybromano",
                "email": "everybodyloves@ray.com",
                "password": "password13332"
            }
        ]
    },
    {
        "model": "Text",
        "documents": [{
            "userId": "59efb4eacac3ed56b3441ee6",
            "title": "My Beautiful Tester",
            "content": "Im up in the world, I write great text for my first post that watson should look into"
        }]
    },
    {
        "model": "Twet",
        "documents": [{
            "userId": "59efb4eacac3ed56b3441ee6",
            "handle": "@realdonaldtrump"
        }]
    }
]