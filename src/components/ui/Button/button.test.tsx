import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { ButtonSizes, ButtonVariants } from "./Button.type";

describe("Button Component", () => {
  test("should match snapshot.", () => {
    const { container } = render(
      <Button
        text="Snapshot Button"
        ariaLabel="Snapshot Button"
        size={ButtonSizes.MEDIUM}
        buttonVariant={ButtonVariants.PRIMARY}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should check if the passed ref points to the correct DOM element.", () => {
    const ref = { current: null };

    render(
      <Button
        text="Ref Button"
        ariaLabel="Ref Button"
        size={ButtonSizes.MEDIUM}
        buttonVariant={ButtonVariants.PRIMARY}
        ref={ref}
      />,
    );

    const button = screen.getByRole("button", { name: /ref button/i });

    expect(button).toBeInTheDocument();
    expect(ref.current).toBe(button);
  });

  test("should render the button with correct text and aria-label.", () => {
    render(
      <Button
        text="Click Me"
        ariaLabel="Click Me"
        size={ButtonSizes.MEDIUM}
        buttonVariant={ButtonVariants.PRIMARY}
      />,
    );

    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
  });

  test("should call onClick handler when clicked.", () => {
    const handleClick = jest.fn();

    render(
      <Button
        text="Click Me"
        ariaLabel="Click Me"
        size={ButtonSizes.MEDIUM}
        buttonVariant={ButtonVariants.PRIMARY}
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();

    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("should check keyboard focus (tab) and visible focus indicator.", () => {
    render(
      <Button
        text="Focus Me"
        ariaLabel="Focus Me"
        size={ButtonSizes.MEDIUM}
        buttonVariant={ButtonVariants.PRIMARY}
      />,
    );

    const button = screen.getByRole("button", { name: /focus me/i });

    expect(button).toBeInTheDocument();
    expect(document.body).toHaveFocus();

    button.focus();
    expect(button).toHaveFocus();
  });

  test("should check reading by screen reader (aria-label, aria-pressed, etc.)", () => {
    render(
      <Button
        text="Aria Button"
        ariaLabel="Aria Button"
        size={ButtonSizes.MEDIUM}
        buttonVariant={ButtonVariants.PRIMARY}
        aria-pressed="false"
      />,
    );

    const button = screen.getByRole("button", { name: /aria button/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Aria Button");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  test("should if the onClick event is fired when clicked.", () => {
    const handleClick = jest.fn();

    render(
      <Button
        text="Clickable Button"
        ariaLabel="Clickable Button"
        size={ButtonSizes.MEDIUM}
        buttonVariant={ButtonVariants.PRIMARY}
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole("button", { name: /clickable button/i });

    expect(button).toBeInTheDocument();

    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("should check if it does not fire onClick when disabled.", () => {
    const handleClick = jest.fn();

    render(
      <Button
        text="Disabled Button"
        ariaLabel="Disabled Button"
        size={ButtonSizes.MEDIUM}
        buttonVariant={ButtonVariants.PRIMARY}
        onClick={handleClick}
        disabled
      />,
    );

    const button = screen.getByRole("button", { name: /disabled button/i });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    button.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("should verify that form attributes work as expected when used in forms.", () => {
    render(
      <form>
        <Button
          text="Submit Button"
          ariaLabel="Submit Button"
          size={ButtonSizes.MEDIUM}
          buttonVariant={ButtonVariants.PRIMARY}
          type="submit"
        />
      </form>,
    );

    const button = screen.getByRole("button", { name: /submit button/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  test("should apply SMALL size and PRIMARY variant.", () => {
    const { container } = render(
      <Button
        text="Test Button"
        ariaLabel="Test Button"
        size={ButtonSizes.SMALL}
        buttonVariant={ButtonVariants.PRIMARY}
      />,
    );

    const button = screen.getByRole("button", { name: /test button/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test Button");
    expect(container.firstChild).toHaveClass("size-small");
    expect(container.firstChild).toHaveClass("primary");
  });

  test("should apply MEDIUM size and SECONDARY variant.", () => {
    const { container } = render(
      <Button
        text="Test Button"
        ariaLabel="Test Button"
        size={ButtonSizes.MEDIUM}
        buttonVariant={ButtonVariants.SECONDARY}
      />,
    );

    const button = screen.getByRole("button", { name: /test button/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test Button");
    expect(container.firstChild).toHaveClass("size-medium");
    expect(container.firstChild).toHaveClass("secondary");
  });

  test("should apply LARGE size and TEXT variant.", () => {
    const { container } = render(
      <Button
        text="Test Button"
        ariaLabel="Test Button"
        size={ButtonSizes.LARGE}
        buttonVariant={ButtonVariants.TEXT}
      />,
    );

    const button = screen.getByRole("button", { name: /test button/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test Button");
    expect(container.firstChild).toHaveClass("size-large");
    expect(container.firstChild).toHaveClass("text");
  });
});
