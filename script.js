$(document).ready(function() {
    $('button#start-btn').click(() => $('#main').show() );

    $('input[name="previousCourse"]').change(checkPrevCourse);
    $('input[name="previousExp"]').change(checkPrevExp);
    $('select[name="lastCourse"]').change(checkLastCouse);
    // $('input[name="142Score"]').change(check142Grade);
    $('input[name="apScore"]').change(checkAPGrade);
    $('input[name="ibScore"]').change(checkIBGrade);
    $('#topics-1100').find('select').change(check1100Topics);
    // $('#topics-122').find('select').change(check122Topics);
    $('input[name^="p_1100p"]').change(check1100Problem);
    // $('input[name^="p_122p"]').change(check122Problem);
});

function checkPrevCourse(event) {
    let resp = $('input[name="previousCourse"]:checked').val();
    console.log(resp);
    if (resp == 'Yes') {
        showQuestion(event, $(event.target), $('#lastCourse'));
    } else {
        showNextQuestion(event, $(event.target));
    }
}

function checkPrevExp(event) {
    let resp = $('input[name="previousExp"]:checked').val();
    console.log(resp);
    if (resp == 'No') {
        showQuestion(event, $(event.target), $('#result-1100-noexp'));
    } else {
        showQuestion(event, $(event.target), $('#topics-1100'));
    }
}

function checkLastCouse(event) {
    $('.gradeCheck').prop("checked", false);
    $('.gradeCheck').hide();

    let course = $('select[name="lastCourse"]').val();
    console.log(course);
    switch(course) {
        // case 'CSE142':
        //     showQuestion(event, $(event.target), $('#142Score'));
        //     break;
        case 'AP-A':
            showQuestion(event, $(event.target), $('#apScore'));
            break;
        case 'IB-SL':
        case 'IB-HL':
            showQuestion(event, $(event.target), $('#ibScore'));
            break;
        // case 'ECS':
        // case 'AP-P':
        //     showQuestion(event, $(event.target), $('#result-adv'))
        //     break;
        default:
            showQuestion(event, $(event.target), $('#topics-1100'));
            break;
    }
}

// function check142Grade(event) {
//     $('input[name="apScore"]').prop("checked", false);
//     $('input[name="ibScore"]').prop("checked", false);

//     let grade = $('input[name="142Score"]:checked').val();
//     console.log(grade);
//     switch (grade) {
//         case '2':
//         case '3':
//         case 'S':
//         case 'X':
//             showQuestion(event, $(event.target), $('#topics-1100'));
//             break;
//         default:
//             showQuestion(event, $(event.target), $('#result-adv'));
//             break;
//     }
// }

function checkAPGrade(event) {
    // $('input[name="142Score"]').prop("checked", false);
    $('input[name="ibScore"]').prop("checked", false);

    let grade = $('input[name="apScore"]:checked').val();
    console.log(grade);
    switch (grade) {
        case '3':
        case '4':
        case '5':
        case 'X':
            showQuestion(event, $(event.target), $('#topics-1100'));
            break;
        default:
            showQuestion(event, $(event.target), $('#result-adv'));
            break;
    }
}

function checkIBGrade(event) {
    $('input[name="apScore"]').prop("checked", false);
    // $('input[name="142Score"]').prop("checked", false);

    let grade = $('input[name="ibScore"]:checked').val();
    console.log(grade);
    switch (grade) {
        case '4':
        case '5':
        case '6':
        case '7':
        case 'X':
            showQuestion(event, $(event.target), $('#topics-1100'));
            break;
        default:
            showQuestion(event, $(event.target), $('#result-adv'));
            break;
    }
}

function check1100Topics(event) {
    let topics = $('#topics-1100').find('select');
    console.log(topics);

    let responses = topics.get().map(x => $(x).val());
    if (responses.every(x => x >= 3)) {
        showNextQuestion(event, $(event.target));
    } else if (responses.every(x => x)) {
        showQuestion(event, $(event.target), $('#result-1100-topics'));
    } else {
        showQuestion(event, $(event.target), null);
    }
}

// function check122Topics(event) {
//     let topics = $('#topics-122').find('select');
//     console.log(topics);

//     let responses = topics.get().map(x => $(x).val());
//     if (responses.every(x => x >= 3)) {
//         showNextQuestion(event, $(event.target));
//         // showQuestion(event, $(event.target), $("#result-123"))
//     } else if (responses.every(x => x)) {
//         if ($('select[name="lastCourse"]').val() == 'CSE142') {
//             showQuestion(event, $(event.target), $('#result-1200-from-142'));
//         } else {
//             showQuestion(event, $(event.target), $('#result-1200'));
//         }
//     } else {
//         showQuestion(event, $(event.target), null);
//     }
// }

function check1100Problem(event) {
    let resp = $(event.target).filter(':checked').val();
    console.log(resp);

    if (resp <= 2) {
        showQuestion(event, $(event.target), $('#result-1100-topics'));
    } else if (resp == 3) {
        showQuestion(event, $(event.target), $('#result-adv'));
    } else if ($(event.target).attr('id').startsWith('p_1100p3')) {
        showQuestion(event, $(event.target), $('#result-1200'));
    } else {
        showNextQuestion(event, $(event.target));
    }
}

// function check122Problem(event) {
//     let resp = $(event.target).filter(':checked').val();
//     console.log(resp);

//     if (resp <= 2) {
//         if ($('select[name="lastCourse"]').val() == 'CSE142') {
//             showQuestion(event, $(event.target), $('#result-1200-from-142'));
//         } else {
//             showQuestion(event, $(event.target), $('#result-1200'));
//         }
//     } else if (resp == 3) {
//         showQuestion(event, $(event.target), $('#result-adv'));
//     } else if ($(event.target).attr('id').startsWith('p_122p3')) {
//         if ($('select[name="lastCourse"]').val() == 'CSE142') {
//             showQuestion(event, $(event.target), $('#result-123-from-142'));
//         } else {
//             showQuestion(event, $(event.target), $('#result-123'));
//         }
//     } else {
//         showNextQuestion(event, $(event.target));
//     }
// }

function showQuestion(event, prev, target) {
    // hide all later questions
    prev.parents('.question').nextAll('.question').hide();

    // hide results
    $('.result').hide();

    // hide recruitment
    $('#recruit').hide();

    if (target) {
        target.show();
        target.children().show();

        //// Smoothly scroll to this element that was just revealed
        $("html, body").animate({ scrollTop: $(document).height()}, "fast", "linear");

        if (target.hasClass('result')) {
            if (!target.find("#learn-more").length) {
                learn = $('#learn-more').clone();
                learn.appendTo(target);
                learn.show();
            }

            //$('#recruit').show();

            $('#result-hidden').text(target.attr('id'));
            console.log("Hello");
            saveData(event)
        }
    }
}

function showNextQuestion(event, prev) {
    showQuestion(event, prev, prev.parents('.question').next('.question'));
}


function saveData(e) {
    const action = "https://fling.seas.upenn.edu/~cis110/dynamic/self-assess.php";

    e.preventDefault();
    const data = new FormData($('#main').get()[0]);
    console.log(data);
    fetch(action, {method: 'POST', body: new URLSearchParams(data).toString(),})
    
}
