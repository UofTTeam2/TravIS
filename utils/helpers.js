module.exports = {
    forum_format_date: (date) => {
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        let twelveHourFormatTime;
        let amPm;
        if (new Date(date).getHours() > 12) {
            twelveHourFormatTime = new Date(date).getHours() - 12;
            amPm = 'PM';
        } else {
            twelveHourFormatTime = new Date(date).getHours();
            amPm = 'AM';
        }
        const minutes = new Date(date).getMinutes().toString().padStart(2, '0');
        return `${monthNames[new Date(date).getMonth()]} ${new Date(
            date
        ).getDate()}, ${new Date(
            date
        ).getFullYear()} - ${twelveHourFormatTime}:${minutes} ${amPm}`;
    },
    calc_replies: (posts) => {
        if (posts - 1 <= 0) {
            return 0;
        } else {
            return posts - 1;
        }
    },
    plural_check: (value) => {
        if (value > 0) {
            return 's';
        } else {
            return '';
        }
    },
    render_latest_comment: (comments) => {
        const now = new Date();
        let latestCommentTimestamp = null;
        for (const comment of comments) {
            if (comment.timestamp > latestCommentTimestamp) {
                latestCommentTimestamp = comment.timestamp;
            }
        }
        if (
            latestCommentTimestamp === undefined ||
            latestCommentTimestamp === null
        ) {
            return 'No posts';
        }
        const dayDifference = Math.floor(
            (now.getTime() - latestCommentTimestamp.getTime()) /
                (1000 * 60 * 60 * 24)
        );
        if (dayDifference === 0) {
            return 'Today';
        } else if (dayDifference === 1) {
            return 'Yesterday';
        } else {
            return `${dayDifference} days ago`;
        }
    },
    counter: (index) => {
        return index + 1;
    },
    css_counter: (index) => {
        return 0.7 + (index + 1) / 10;
    },
};
