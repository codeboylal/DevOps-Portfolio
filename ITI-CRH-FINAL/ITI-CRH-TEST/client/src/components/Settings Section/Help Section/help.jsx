
import React from 'react';
import styles from './help.module.css';
import PageSetup from '../../Container/pageSetup/pageSetup';
import ScrollBar from '../../scrollBar/scrollBar';

const HelpSection = () => {
  return (
    <div className={styles.mainContainer}>
      <PageSetup active={"help"} appBar={true}>
        <h1 className={styles.title}>Help</h1>
        <ScrollBar>
        <div className={styles.helpadding}>

          <div className={styles.helpContainer}>
            <section className={styles.section}>
              <div className={styles.sectionBlock}>
                <h2 className={styles.sectionTitle}>Getting Started</h2>
                <p className={styles.description}>
                  If you're new here, start with these basic guides to help you get up and running:
                </p>
                <ul className={styles.list}>
                  <li>
                    <p>Creating an Account</p>
                    <p>Learn how to sign up for an account and access all the features.</p>
                  </li>
                  <li>
                    <p>Setting Up Your Profile</p>
                    <p>Customize your account by adding a profile picture, bio, and personal details.</p>
                  </li>
                  <li>
                    <p>Basic Navigation</p>
                    <p>A guide to navigating through the platform’s key features.</p>
                  </li>
                </ul>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.sectionTitle}>Account Management</h2>
                <p className={styles.description}>
                  Managing your account is easy. Here's how to keep things running smoothly:
                </p>
                <ul className={styles.list}>
                  <li>
                    <p>Changing Your Password</p>
                    <p>Step-by-step instructions on how to reset your password if you've forgotten it, or how to update it for security.</p>
                  </li>
                  <li>
                    <p>Managing Email Preferences</p>
                    <p>Learn how to control the types of notifications and emails you receive.</p>
                  </li>
                  <li>
                    <p>Deleting or Deactivating Your Account</p>
                    <p>If you ever wish to close your account, here's how you can do that.</p>
                  </li>
                </ul>
              </div>

              <div className={styles.sectionBlock}>
                <h2 className={styles.sectionTitle}>Troubleshooting</h2>
                <p className={styles.description}>
                  Running into problems? Check out these solutions to common issues:
                </p>
                <ul className={styles.list}>
                  <li>
                    <p>Login Issues</p>
                    <p>If you're having trouble logging in, follow these steps to resolve it.</p>
                  </li>
                  <li>
                    <p>Payment or Billing Issues</p>
                    <p>Having issues with a payment? Find out how to update your payment details or address billing concerns</p>
                  </li>
                  <li>
                    <p>App/Website Not Loading</p>
                    <p >Troubleshooting tips for when the app or website is not responding.</p>

                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        </ScrollBar>
      </PageSetup>
    </div>
  );
};

export default HelpSection;
