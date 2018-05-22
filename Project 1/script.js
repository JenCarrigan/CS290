var projects = [
    {
        'name': 'DBD Brochure',
        'type': 'design',
        'isOnline': false
    },
    {
        'name': 'Acute PTSD',
        'type': 'writing',
        'isOnline': true
    },
    {
        'name': 'Post-Concussion Syndrome',
        'type': 'writing',
        'isOnline': true
    },
    {
        'name': 'Medical Error',
        'type': 'writing',
        'isOnline': true
    },
    {
        'name': 'Kyle Drinnon Bio',
        'type': 'design',
        'isOnline': true
    }
];

var skills = [
    {
        'name': 'C++',
        'type': 'language',
        'start': 2014,
        'end': 2017
    },
    {
        'name': 'Assembly for IA32',
        'type': 'language',
        'start': 2015,
        'end': 2017
    },
    {
        'name': 'HTML',
        'type': 'language',
        'start': 2007,
        'end': 2017
    },
    {
        'name': 'Visual Studio',
        'type': 'software',
        'start': 2014,
        'end': 2017
    },
    {
        'name': 'Microsoft Office',
        'type': 'software',
        'start': 1997,
        'end': 2017
    },
    {
        'name': 'QuickBooks',
        'type': 'software',
        'start': 2012,
        'end': 2017
    },
    {
        'name': 'Adobe Creative Suite',
        'type': 'software',
        'start': 2009,
        'end': 2017
    },
    {
        'name': 'Proofreading',
        'type': 'other',
        'start': 2005,
        'end': 2017
    },
    {
        'name': 'Google Adwords',
        'type': 'other',
        'start': 2016,
        'end': 2017
    }
];

function online() {
    var results = [];
    for (var i in projects) {
        var project = projects[i];
        if (project.isOnline == true) {
            results.push(project.name);
        }
    }
    return results;
}
console.log(online().join(', '));

function design() {
    var results = [];
    for (var i in projects) {
        var project = projects[i];
        if (project.type == 'design') {
            results.push(project.name);
        }
    } 
    return results;
}

function showSkills(filtered) {
    var list = $('#skills');
    list.empty();
    for (var i in filtered) {
        var skill = filtered[i];
        $('<li>' + filtered[i] + '<li>').appendTo(list);
    }
}

function all() {
    var results = [];
    for (var i in skills) {
        var skill = skills[i];
        results.push(skill.name);
    }
    return results;
}

$('#all').on('click', function() {
    showSkills(all());
    $('h3').text('Skills Sorted by Start Date');
});

showSkills(all());
    
function knownLang() {
    var results = [];
    for (var i in skills) {
        var skill = skills[i];
        if (skill.type == 'language') {
            results.push(skill.name);
        }
    }
    return results;
}

$('#lang').on('click', function() {
    showSkills(knownLang());
    $('h3').text('Known Computer Languages');
});

function sortedSkills() {
    var results = [];
    skills.sort(function(a, b) {
        return a.start - b.start;
    });
    for (var i in skills) {
        var skill = skills[i];
        results.push(skill.name);
    }
    return results;
}
console.log('My skills in order of start date are ' + sortedSkills().join(', '));

function knownSoft() {
    var results = [];
    for (var i in skills) {
        var skill = skills[i];
        if (skill.type == 'software') {
            results.push(skill.name);
        }
    }
    return results;
}

$('#soft').on('click', function() {
    showSkills(knownSoft());
    $('h3').text('Software');
});

$(function() {
    $('#design').on('click', function() {
        $('#art').toggle();
    });
});

$(function() {
    $('#online').on('click', function() {
        $('#broch').toggle();
    });
});

$('.carousel').carousel({
   interval: 7000
  });



