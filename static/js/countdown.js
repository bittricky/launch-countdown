const FlipCountdown = (() => {
  const TIME_CONSTANTS = {
    SECONDS_PER_DAY: 24 * 60 * 60,
    SECONDS_PER_HOUR: 60 * 60,
    SECONDS_PER_MINUTE: 60,
    UPDATE_INTERVAL: 250,
  };

  const SELECTORS = {
    days: ".days > .flip-card",
    hours: ".hours > .flip-card",
    minutes: ".minutes > .flip-card",
    seconds: ".seconds > .flip-card",
  };

  class FlipCard {
    constructor(element) {
      this.element = element;
      this.topHalf = element.querySelector(".top");
      this.bottomHalf = element.querySelector(".bottom");
    }

    createFlipElements(currentValue, newValue) {
      const topFlip = document.createElement("div");
      topFlip.classList.add("top-flip");
      topFlip.innerText = currentValue;

      const bottomFlip = document.createElement("div");
      bottomFlip.classList.add("bottom-flip");
      bottomFlip.innerText = newValue;

      return [topFlip, bottomFlip];
    }

    animate(newValue) {
      if (typeof newValue === "undefined") {
        throw new Error("New value is required for flip animation");
      }

      const formattedValue = String(newValue).padStart(2, "0");
      const currentValue = this.topHalf.innerText;

      if (formattedValue === currentValue) return;

      const [topFlip, bottomFlip] = this.createFlipElements(
        currentValue,
        formattedValue
      );

      topFlip.addEventListener(
        "animationstart",
        () => {
          this.topHalf.innerText = formattedValue;
        },
        { once: true }
      );

      topFlip.addEventListener(
        "animationend",
        () => {
          topFlip.remove();
        },
        { once: true }
      );

      bottomFlip.addEventListener(
        "animationend",
        () => {
          this.bottomHalf.innerText = formattedValue;
          bottomFlip.remove();
        },
        { once: true }
      );

      requestAnimationFrame(() => {
        this.element.appendChild(topFlip);
        this.element.appendChild(bottomFlip);
      });
    }
  }

  class CountdownTimer {
    constructor(targetDate, options = {}) {
      this.validateTargetDate(targetDate);
      this.targetDate = targetDate;
      this.previousTime = null;
      this.isRunning = false;
      this.cards = this.initializeCards();
      this.onComplete = options.onComplete;
    }

    validateTargetDate(date) {
      if (!(date instanceof Date) || isNaN(date)) {
        throw new Error("Invalid target date provided");
      }
      if (date < new Date()) {
        throw new Error("Target date must be in the future");
      }
    }

    initializeCards() {
      return {
        days: new FlipCard(document.querySelector(SELECTORS.days)),
        hours: new FlipCard(document.querySelector(SELECTORS.hours)),
        minutes: new FlipCard(document.querySelector(SELECTORS.minutes)),
        seconds: new FlipCard(document.querySelector(SELECTORS.seconds)),
      };
    }

    calculateTimeUnits(totalSeconds) {
      return {
        days: Math.floor(totalSeconds / TIME_CONSTANTS.SECONDS_PER_DAY),
        hours: Math.floor(
          (totalSeconds / TIME_CONSTANTS.SECONDS_PER_HOUR) % 24
        ),
        minutes: Math.floor(
          (totalSeconds / TIME_CONSTANTS.SECONDS_PER_MINUTE) % 60
        ),
        seconds: Math.floor(totalSeconds % 60),
      };
    }

    calculateRemaining() {
      const remaining = this.targetDate - new Date();
      return Math.max(0, Math.floor(remaining / 1000));
    }

    updateCards(timeUnits) {
      Object.entries(timeUnits).forEach(([unit, value]) => {
        this.cards[unit].animate(value);
      });
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;

      let lastUpdate = performance.now();

      const update = () => {
        const now = performance.now();

        // Only update if enough time has passed
        if (now - lastUpdate >= TIME_CONSTANTS.UPDATE_INTERVAL) {
          const remaining = this.calculateRemaining();

          if (remaining !== this.previousTime) {
            const timeUnits = this.calculateTimeUnits(remaining);
            this.updateCards(timeUnits);
            this.previousTime = remaining;

            // Stop the countdown if we've reached zero
            if (remaining <= 0) {
              this.stop();
              this.onComplete?.();
              return;
            }
          }

          lastUpdate = now;
        }

        if (this.isRunning) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    }

    stop() {
      this.isRunning = false;
    }

    onComplete(callback) {
      this.onComplete = callback;
    }
  }

  return {
    /**
     * Creates and starts a new countdown timer
     * @param {Object} config Configuration object
     * @param {number} config.hours Number of hours to count down
     * @param {Date} config.targetDate Specific date to count down to
     * @param {Function} config.onComplete Callback when countdown completes
     * @returns {Object} Timer control interface
     */
    create(config = {}) {
      try {
        const targetDate =
          config.targetDate ||
          (() => {
            const date = new Date();
            date.setHours(date.getHours() + (config.hours || 2080));
            return date;
          })();

        const timer = new CountdownTimer(targetDate, {
          onComplete: config.onComplete,
        });

        return {
          start: () => timer.start(),
          stop: () => timer.stop(),
          getTimeRemaining: () => timer.calculateRemaining(),
        };
      } catch (error) {
        console.error("Failed to create countdown:", error);
        throw error;
      }
    },
  };
})();

export default FlipCountdown;
